const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://oliviers44.sg-host.com';
const SOCIO_COUPON_CODE = 'SOCIO';

const parseAmount = (value, fallback = 0) => {
  const normalized = String(value ?? '').trim().replace(',', '.');
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const isSocioCoupon = (value) => {
  const normalized = String(value ?? '').trim().toUpperCase();
  return normalized === SOCIO_COUPON_CODE || normalized === `${SOCIO_COUPON_CODE}95`;
};

const storeApiRequest = async ({ path, method = 'GET', token, body }) => {
  const headers = {
    Accept: 'application/json',
  };

  if (token) {
    headers['Cart-Token'] = token;
  }

  if (body) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(`${WORDPRESS_URL}/wp-json/wc/store/v1/${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(payload?.message || `WooCommerce Store API error (${response.status})`);
  }

  return {
    data: payload,
    token: response.headers.get('cart-token') || token,
  };
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const orderData = req.body;

    // Validation basique
    if (!orderData.line_items || orderData.line_items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Le panier est vide'
      });
    }

    if (!orderData.billing) {
      return res.status(400).json({
        success: false,
        message: 'Les informations de facturation sont requises'
      });
    }

    const {
      billing,
      shipping,
      line_items: lineItems,
      customer_note: customerNote = '',
      coupon_code: couponCode = '',
      coupon_discount_amount: couponDiscountAmount = 0,
    } = orderData;

    let token;
    ({ token } = await storeApiRequest({ path: 'cart' }));

    for (const item of lineItems) {
      const itemId = item.variation_id || item.product_id;

      if (!itemId || !item.quantity) {
        continue;
      }

      ({ token } = await storeApiRequest({
        path: `cart/add-item?id=${encodeURIComponent(itemId)}&quantity=${encodeURIComponent(item.quantity)}`,
        method: 'POST',
        token,
      }));
    }

    ({ token } = await storeApiRequest({
      path: 'cart/update-customer',
      method: 'POST',
      token,
      body: {
        billing_address: billing,
        shipping_address: shipping || billing,
      },
    }));

    ({ token } = await storeApiRequest({
      path: 'checkout?__experimental_calc_totals=true',
      method: 'PUT',
      token,
      body: {
        payment_method: 'stripe',
        customer_note: customerNote,
      },
    }));

    const { data: order } = await storeApiRequest({
      path: 'checkout',
      token,
    });

    if (!order?.order_id || !order?.order_key) {
      throw new Error('Unable to create WooCommerce checkout session.');
    }

    // Apply SOCIO discount directly on the created WooCommerce order
    // so totals shown on order-pay/Stripe match the checkout summary.
    let couponSyncWarning = null;

    if (isSocioCoupon(couponCode)) {
      const discountCandidate = parseAmount(couponDiscountAmount, 0);

      if (discountCandidate > 0) {
        try {
          const { default: wcApi } = await import('@/src/lib/woocommerce');
          const { data: wcOrder } = await wcApi.get(`orders/${order.order_id}`);
          const currentTotal = parseAmount(wcOrder?.total, 0);
          const appliedDiscount = Math.min(discountCandidate, currentTotal);

          if (appliedDiscount > 0) {
            const cleanedFeeLines = Array.isArray(wcOrder?.fee_lines)
              ? wcOrder.fee_lines
                  .filter((feeLine) => !String(feeLine?.name ?? '').toUpperCase().includes(SOCIO_COUPON_CODE))
                  .map((feeLine) => ({
                    id: feeLine.id,
                    name: feeLine.name,
                    total: String(feeLine.total ?? '0'),
                    taxable: feeLine.taxable ?? false,
                  }))
              : [];

            const cleanedMetaData = Array.isArray(wcOrder?.meta_data)
              ? wcOrder.meta_data.filter((meta) => !['dosalga_coupon_code', 'dosalga_coupon_discount', 'dosalga_coupon_type'].includes(meta?.key))
              : [];

            await wcApi.put(`orders/${order.order_id}`, {
              fee_lines: [
                ...cleanedFeeLines,
                {
                  name: `${SOCIO_COUPON_CODE} -95% margin`,
                  total: (-appliedDiscount).toFixed(2),
                  taxable: false,
                },
              ],
              meta_data: [
                ...cleanedMetaData,
                { key: 'dosalga_coupon_code', value: SOCIO_COUPON_CODE },
                { key: 'dosalga_coupon_discount', value: appliedDiscount.toFixed(2) },
                { key: 'dosalga_coupon_type', value: 'margin_percent' },
              ],
            });
          }
        } catch (couponSyncError) {
          console.error('SOCIO coupon sync warning:', couponSyncError);
          couponSyncWarning = 'SOCIO coupon could not be synchronized on Woo order (non-blocking).';
        }
      }
    }

    const paymentUrl = `${WORDPRESS_URL}/checkout/order-pay/${order.order_id}/?pay_for_order=true&key=${order.order_key}`;
    
    res.status(201).json({
      success: true,
      data: {
        ...order,
        id: order.order_id,
        payment_url: paymentUrl,
      },
      warning: couponSyncWarning,
      message: 'Commande créée avec succès'
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de la création de la commande',
      error: error.message 
    });
  }
}
