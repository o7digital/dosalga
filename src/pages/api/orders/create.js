const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://oliviers44.sg-host.com';
const SOCIO_COUPON_CODE = 'X9YPYWYH';
const SOCIO_DISCOUNT_RATE = 0.90;
const SOCIO_DISCOUNT_PERCENT = Math.round(SOCIO_DISCOUNT_RATE * 100);
const CHECKOUT_DEBUG = process.env.CHECKOUT_DEBUG === '1';

const parseAmount = (value, fallback = 0) => {
  const normalized = String(value ?? '').trim().replace(',', '.');
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const isSocioCoupon = (value) => {
  const normalized = String(value ?? '').trim().toUpperCase();
  return normalized === SOCIO_COUPON_CODE;
};

const normalizeCouponCode = (value) => String(value ?? '').trim().toUpperCase();

const normalizeMetaData = (metaData) => {
  if (!Array.isArray(metaData)) {
    return [];
  }

  return metaData
    .filter((meta) => meta?.key && meta?.value !== undefined && meta?.value !== null && String(meta.value).trim() !== '')
    .map((meta) => ({
      key: String(meta.key),
      value: String(meta.value),
    }));
};

const normalizeBaseUrl = (value, fallback) => {
  try {
    return new URL(value).origin;
  } catch {
    return fallback;
  }
};

const resolveRequestOrigin = (req) => {
  const hostHeader = req.headers['x-forwarded-host'] || req.headers.host;
  const host = Array.isArray(hostHeader) ? String(hostHeader[0]).split(',')[0].trim() : String(hostHeader || '').split(',')[0].trim();
  if (!host) return null;

  const protoHeader = req.headers['x-forwarded-proto'];
  const protocol = Array.isArray(protoHeader)
    ? String(protoHeader[0]).split(',')[0].trim()
    : String(protoHeader || '').split(',')[0].trim();
  const safeProtocol = protocol === 'http' ? 'http' : 'https';
  return `${safeProtocol}://${host}`;
};

const resolveCheckoutBaseUrl = (req) => {
  const forcedCheckoutBaseUrl = process.env.WC_FORCE_CHECKOUT_BASE_URL;
  if (forcedCheckoutBaseUrl) {
    return normalizeBaseUrl(forcedCheckoutBaseUrl, WORDPRESS_URL);
  }

  const configuredBaseUrl =
    process.env.WC_CHECKOUT_BASE_URL ||
    process.env.NEXT_PUBLIC_CHECKOUT_BASE_URL ||
    process.env.NEXT_PUBLIC_WORDPRESS_URL;

  if (configuredBaseUrl) {
    return normalizeBaseUrl(configuredBaseUrl, WORDPRESS_URL);
  }

  const requestOrigin = resolveRequestOrigin(req);
  if (requestOrigin) {
    return requestOrigin;
  }

  return WORDPRESS_URL;
};

const buildPaymentUrl = (orderId, orderKey, req) => {
  const baseUrl = resolveCheckoutBaseUrl(req);
  return `${baseUrl}/checkout/order-pay/${orderId}/?pay_for_order=true&key=${orderKey}`;
};

const readRequestIp = (req) => {
  const forwardedFor = req.headers['x-forwarded-for'];
  if (typeof forwardedFor === 'string' && forwardedFor.trim()) {
    return forwardedFor.split(',')[0].trim();
  }

  if (Array.isArray(forwardedFor) && forwardedFor.length > 0) {
    return String(forwardedFor[0]).split(',')[0].trim();
  }

  const cfIp = req.headers['cf-connecting-ip'];
  if (typeof cfIp === 'string' && cfIp.trim()) {
    return cfIp.trim();
  }

  return req.socket?.remoteAddress || 'unknown';
};

const getCheckoutDebugContext = (req, orderData = {}) => {
  return {
    ip: readRequestIp(req),
    cfCountry: req.headers['cf-ipcountry'] || null,
    userAgent: req.headers['user-agent'] || null,
    billingCountry: orderData?.billing?.country || null,
    billingState: orderData?.billing?.state || null,
    billingCity: orderData?.billing?.city || null,
  };
};

const normalizeVariationAttributes = (variationAttributes) => {
  if (!Array.isArray(variationAttributes)) {
    return [];
  }

  return variationAttributes
    .filter((attribute) => attribute?.attribute && attribute?.value)
    .map((attribute) => ({
      attribute: String(attribute.attribute),
      value: String(attribute.value),
    }));
};

const isExistingAccountCheckoutError = (error) => {
  const message = String(error?.message || '').toLowerCase();
  const code = String(error?.code || '').toLowerCase();
  return (
    message.includes('already exists') ||
    message.includes('email') && message.includes('exists') ||
    message.includes('existing account') ||
    code.includes('registration') ||
    code.includes('invalid_customer')
  );
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
  let payload = null;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = { raw: text };
    }
  }

  if (!response.ok) {
    const error = new Error(payload?.message || `WooCommerce Store API error (${response.status})`);
    error.status = response.status;
    error.code = payload?.code || null;
    error.details = payload?.data || null;
    error.path = path;
    throw error;
  }

  return {
    data: payload,
    token: response.headers.get('cart-token') || token,
  };
};

const addStoreCartItem = async ({ item, token }) => {
  const productId = Number.parseInt(item?.product_id, 10);
  const variationId = Number.parseInt(item?.variation_id, 10);
  const quantity = Number.parseInt(item?.quantity, 10);

  if (!Number.isFinite(productId) || productId <= 0 || !Number.isFinite(quantity) || quantity <= 0) {
    return token;
  }

  const variationAttributes = normalizeVariationAttributes(item?.variation_attributes);
  const attempts = [];

  if (Number.isFinite(variationId) && variationId > 0) {
    attempts.push({
      id: variationId,
      quantity,
      ...(variationAttributes.length > 0 ? { variation: variationAttributes } : {}),
    });
  }

  attempts.push({
    id: productId,
    quantity,
    ...(variationAttributes.length > 0 ? { variation: variationAttributes } : {}),
  });

  const uniqueAttempts = attempts.filter((attempt, index, collection) => {
    return collection.findIndex((entry) => JSON.stringify(entry) === JSON.stringify(attempt)) === index;
  });

  let lastError = null;
  let nextToken = token;

  for (const attempt of uniqueAttempts) {
    try {
      ({ token: nextToken } = await storeApiRequest({
        path: 'cart/add-item',
        method: 'POST',
        token: nextToken,
        body: attempt,
      }));
      return nextToken;
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('Unable to add item to WooCommerce cart.');
};

export default async function handler(req, res) {
  const debugId = `co_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed', debug_id: debugId });
  }

  try {
    const orderData = req.body;
    const debugContext = getCheckoutDebugContext(req, orderData);
    if (CHECKOUT_DEBUG) {
      console.info(`[checkout:${debugId}] request_received`, debugContext);
    }

    // Validation basique
    if (!orderData.line_items || orderData.line_items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Le panier est vide',
        debug_id: debugId,
      });
    }

    if (!orderData.billing) {
      return res.status(400).json({
        success: false,
        message: 'Les informations de facturation sont requises',
        debug_id: debugId,
      });
    }

    const {
      billing,
      shipping,
      line_items: lineItems,
      customer_note: customerNote = '',
      create_account: createAccount = false,
      account_password: accountPassword = '',
      coupon_code: couponCode = '',
      coupon_discount_amount: couponDiscountAmount = 0,
      meta_data: requestedMetaData = [],
    } = orderData;

    let token;
    ({ token } = await storeApiRequest({ path: 'cart' }));
    if (CHECKOUT_DEBUG) {
      console.info(`[checkout:${debugId}] cart_token_created`);
    }

    for (const item of lineItems) {
      token = await addStoreCartItem({ item, token });
    }
    if (CHECKOUT_DEBUG) {
      console.info(`[checkout:${debugId}] cart_items_added`, { count: lineItems.length });
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
        couponSyncWarning = `${SOCIO_COUPON_CODE} coupon is active in the app but missing in WooCommerce coupons.`;
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
    if (CHECKOUT_DEBUG) {
      console.info(`[checkout:${debugId}] customer_updated`, {
        billingCountry: billing?.country || null,
        billingState: billing?.state || null,
        billingCity: billing?.city || null,
      });
    }

    let accountCreationWarning = null;
    const checkoutPayload = {
      payment_method: 'stripe',
      customer_note: customerNote,
      create_account: Boolean(createAccount),
      ...(createAccount && accountPassword ? { account_password: accountPassword } : {}),
    };

    try {
      ({ token } = await storeApiRequest({
        path: 'checkout?__experimental_calc_totals=true',
        method: 'PUT',
        token,
        body: checkoutPayload,
      }));
    } catch (checkoutError) {
      if (createAccount && isExistingAccountCheckoutError(checkoutError)) {
        accountCreationWarning = 'Ce compte existe deja. Paiement continue sans creation de compte.';
        ({ token } = await storeApiRequest({
          path: 'checkout?__experimental_calc_totals=true',
          method: 'PUT',
          token,
          body: {
            payment_method: 'stripe',
            customer_note: customerNote,
            create_account: false,
          },
        }));
      } else {
        throw checkoutError;
      }
    }
    if (CHECKOUT_DEBUG) {
      console.info(`[checkout:${debugId}] checkout_totals_calculated`);
    }

    const { data: order } = await storeApiRequest({
      path: 'checkout',
      token,
    });
    if (CHECKOUT_DEBUG) {
      console.info(`[checkout:${debugId}] checkout_order_created`, {
        orderId: order?.order_id || null,
      });
    }

    if (!order?.order_id || !order?.order_key) {
      throw new Error('Unable to create WooCommerce checkout session.');
    }

    const orderMetaData = normalizeMetaData(requestedMetaData);

    if (orderMetaData.length > 0) {
      try {
        const { default: wcApi } = await import('@/src/lib/woocommerce');
        const { data: wcOrder } = await wcApi.get(`orders/${order.order_id}`);
        const protectedMetaKeys = new Set(orderMetaData.map((meta) => meta.key));
        const cleanedMetaData = Array.isArray(wcOrder?.meta_data)
          ? wcOrder.meta_data.filter((meta) => !protectedMetaKeys.has(meta?.key))
          : [];

        await wcApi.put(`orders/${order.order_id}`, {
          meta_data: [...cleanedMetaData, ...orderMetaData],
        });
      } catch (metaSyncError) {
        console.error('Order private meta sync warning:', metaSyncError);
      }
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
              ? wcOrder.meta_data.filter((meta) => !['dosalga_coupon_code', 'dosalga_coupon_discount', 'dosalga_coupon_type', 'dosalga_coupon_rate'].includes(meta?.key))
              : [];

            await wcApi.put(`orders/${order.order_id}`, {
              fee_lines: [
                ...cleanedFeeLines,
                {
                  name: `${SOCIO_COUPON_CODE} -${SOCIO_DISCOUNT_PERCENT}%`,
                  total: (-appliedDiscount).toFixed(2),
                  taxable: false,
                },
              ],
              meta_data: [
                ...cleanedMetaData,
                { key: 'dosalga_coupon_code', value: SOCIO_COUPON_CODE },
                { key: 'dosalga_coupon_discount', value: appliedDiscount.toFixed(2) },
                { key: 'dosalga_coupon_type', value: 'percent' },
                { key: 'dosalga_coupon_rate', value: String(SOCIO_DISCOUNT_RATE) },
              ],
            });
            isSocioDiscountApplied = true;
          }
        } catch (couponSyncError) {
          console.error(`${SOCIO_COUPON_CODE} coupon sync warning:`, couponSyncError);
          couponSyncWarning = `${SOCIO_COUPON_CODE} coupon could not be synchronized on Woo order.`;
        }
      }
    }

    if (isSocioCoupon(normalizedCouponCode) && !isSocioDiscountApplied) {
      return res.status(422).json({
        success: false,
        message: `Le coupon ${SOCIO_COUPON_CODE} n’est pas configuré côté WooCommerce. Créez le coupon ${SOCIO_COUPON_CODE} dans WooCommerce > Marketing > Coupons.`,
        debug_id: debugId,
      });
    }

    const paymentUrl =
      order?.payment_url ||
      order?.checkout_payment_url ||
      buildPaymentUrl(order.order_id, order.order_key, req);
    console.info(`[checkout:${debugId}] order_ready_for_payment`, {
      orderId: order.order_id,
      orderKey: order.order_key,
      paymentUrl,
      currency: order.currency_code || null,
      total: order.totals?.total_price || null,
      billingCountry: billing?.country || null,
      billingState: billing?.state || null,
      couponCode: normalizedCouponCode || null,
      couponApplied: isSocioDiscountApplied,
    });
    
    res.status(201).json({
      success: true,
      data: {
        ...order,
        id: order.order_id,
        payment_url: paymentUrl,
      },
      coupon_applied: !isSocioCoupon(normalizedCouponCode) || isSocioDiscountApplied,
      warning: [couponSyncWarning, accountCreationWarning].filter(Boolean).join(' ') || null,
      message: 'Commande créée avec succès',
      debug_id: debugId,
    });
  } catch (error) {
    console.error(`[checkout:${debugId}] error`, error);
    const isAccountError =
      /account|registration|email/i.test(String(error?.message || '')) ||
      /woocommerce_rest_checkout_invalid_customer/i.test(String(error?.code || '')) ||
      /registration-error/i.test(String(error?.code || ''));
    const message = isAccountError
      ? `Erreur de création de compte: ${error?.message || 'information manquante ou email déjà utilisé'}`
      : 'Erreur lors de la création de la commande';
    res.status(500).json({ 
      success: false,
      message,
      error: error.message,
      error_code: error?.code || null,
      error_path: error?.path || null,
      debug_id: debugId,
    });
  }
}
