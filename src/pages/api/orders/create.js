const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://oliviers44.sg-host.com';
const CHECKOUT_BASE_URL =
  process.env.WC_CHECKOUT_BASE_URL ||
  process.env.NEXT_PUBLIC_CHECKOUT_BASE_URL ||
  WORDPRESS_URL;
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

const normalizeCouponCode = (value) => String(value ?? '').trim().toUpperCase();

const normalizeBaseUrl = (value, fallback) => {
  try {
    return new URL(value).origin;
  } catch {
    return fallback;
  }
};

const buildPaymentUrl = (orderId, orderKey) => {
  const baseUrl = normalizeBaseUrl(CHECKOUT_BASE_URL, WORDPRESS_URL);
  return `${baseUrl}/checkout/order-pay/${orderId}/?pay_for_order=true&key=${orderKey}`;
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

    let couponSyncWarning = null;
    let isSocioDiscountApplied = false;
    const normalizedCouponCode = normalizeCouponCode(couponCode);

    // First try applying the coupon through Woo Store API cart token flow.
    // This path does not require wc/v3 write permissions.
    if (isSocioCoupon(normalizedCouponCode)) {
      try {
        ({ token } = await storeApiRequest({
          path: 'cart/apply-coupon',
          method: 'POST',
          token,
          body: { code: SOCIO_COUPON_CODE },
        }));
        isSocioDiscountApplied = true;
      } catch (storeCouponError) {
        console.error('Store coupon apply warning:', storeCouponError);
        couponSyncWarning = 'SOCIO coupon is active in the app but missing in WooCommerce coupons.';
      }
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

    // Fallback: if Store API coupon could not be applied, try direct wc/v3 order edit.
    // This requires write permissions on Woo REST keys.
    if (isSocioCoupon(normalizedCouponCode) && !isSocioDiscountApplied) {
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
            isSocioDiscountApplied = true;
          }
        } catch (couponSyncError) {
          console.error('SOCIO coupon sync warning:', couponSyncError);
          couponSyncWarning = 'SOCIO coupon could not be synchronized on Woo order.';
        }
      }
    }

    if (isSocioCoupon(normalizedCouponCode) && !isSocioDiscountApplied) {
      return res.status(422).json({
        success: false,
        message: 'Le coupon SOCIO n’est pas configuré côté WooCommerce. Créez le coupon SOCIO dans WooCommerce > Marketing > Coupons.',
      });
    }

    const paymentUrl = buildPaymentUrl(order.order_id, order.order_key);
    
    res.status(201).json({
      success: true,
      data: {
        ...order,
        id: order.order_id,
        payment_url: paymentUrl,
      },
      coupon_applied: isSocioDiscountApplied,
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
