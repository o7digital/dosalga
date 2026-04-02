const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://oliviers44.sg-host.com';

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

    const { billing, shipping, line_items: lineItems, customer_note: customerNote = '' } = orderData;

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

    const paymentUrl = `${WORDPRESS_URL}/checkout/order-pay/${order.order_id}/?pay_for_order=true&key=${order.order_key}`;
    
    res.status(201).json({
      success: true,
      data: {
        ...order,
        id: order.order_id,
        payment_url: paymentUrl,
      },
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
