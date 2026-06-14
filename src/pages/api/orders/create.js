const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://oliviers44.sg-host.com';
const SOCIO_COUPON_CODE = String(process.env.SOCIO_COUPON_CODE ?? '').trim().toUpperCase();
const SOCIO_DISCOUNT_RATE = 0.50;
const SOCIO_DISCOUNT_PERCENT = Math.round(SOCIO_DISCOUNT_RATE * 100);
const STORE_CURRENCY = 'USD';
const CHECKOUT_DEBUG = process.env.CHECKOUT_DEBUG === '1';

const parseAmount = (value, fallback = 0) => {
  const normalized = String(value ?? '').trim().replace(',', '.');
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const isSocioCoupon = (value) => {
  const normalized = String(value ?? '').trim().toUpperCase();
  return Boolean(SOCIO_COUPON_CODE) && normalized === SOCIO_COUPON_CODE;
};

const normalizeCouponCode = (value) => String(value ?? '').trim().toUpperCase();

const normalizeCurrencyCode = (value) => {
  const normalized = String(value ?? '').trim().toUpperCase();
  return normalized || STORE_CURRENCY;
};

const normalizeEmail = (value) => String(value ?? '').trim().toLowerCase();

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

const isWooWritePermissionError = (error) => {
  const status = Number(error?.response?.status || error?.status || error?.details?.status || 0);
  const code = String(error?.response?.data?.code || error?.code || '').toLowerCase();
  const message = String(error?.response?.data?.message || error?.message || '').toLowerCase();

  return (
    status === 401
    && (
      code.includes('authentication')
      || message.includes('write permissions')
      || message.includes('does not have write')
    )
  );
};

const buildCustomerPayload = ({ billing, shipping, accountPassword }) => ({
  email: normalizeEmail(billing?.email),
  first_name: String(billing?.first_name || '').trim(),
  last_name: String(billing?.last_name || '').trim(),
  username: normalizeEmail(billing?.email),
  ...(accountPassword ? { password: accountPassword } : {}),
  billing: {
    first_name: billing?.first_name || '',
    last_name: billing?.last_name || '',
    company: billing?.company || '',
    address_1: billing?.address_1 || '',
    address_2: billing?.address_2 || '',
    city: billing?.city || '',
    state: billing?.state || '',
    postcode: billing?.postcode || '',
    country: billing?.country || '',
    email: normalizeEmail(billing?.email),
    phone: billing?.phone || '',
  },
  shipping: {
    first_name: shipping?.first_name || billing?.first_name || '',
    last_name: shipping?.last_name || billing?.last_name || '',
    company: shipping?.company || '',
    address_1: shipping?.address_1 || billing?.address_1 || '',
    address_2: shipping?.address_2 || billing?.address_2 || '',
    city: shipping?.city || billing?.city || '',
    state: shipping?.state || billing?.state || '',
    postcode: shipping?.postcode || billing?.postcode || '',
    country: shipping?.country || billing?.country || '',
  },
});

const findCustomerByEmail = async (wcApi, email) => {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return null;
  }

  const { data: customers } = await wcApi.get('customers', {
    email: normalizedEmail,
    per_page: 1,
  });

  return Array.isArray(customers) && customers.length > 0 ? customers[0] : null;
};

const createOrFindCustomer = async ({ wcApi, billing, shipping, accountPassword }) => {
  const email = normalizeEmail(billing?.email);

  if (!email) {
    throw new Error('Cannot create a WooCommerce customer without an email.');
  }

  const existingCustomer = await findCustomerByEmail(wcApi, email);

  if (existingCustomer?.id) {
    return {
      customer: existingCustomer,
      created: false,
      warning: 'Un compte client existe deja pour cet email. La commande a ete rattachee au client existant.',
    };
  }

  try {
    const { data: createdCustomer } = await wcApi.post('customers', buildCustomerPayload({
      billing,
      shipping,
      accountPassword,
    }));

    return {
      customer: createdCustomer,
      created: true,
      warning: null,
    };
  } catch (error) {
    const existingAfterCreateError = await findCustomerByEmail(wcApi, email);

    if (existingAfterCreateError?.id) {
      return {
        customer: existingAfterCreateError,
        created: false,
        warning: 'Un compte client existe deja pour cet email. La commande a ete rattachee au client existant.',
      };
    }

    throw error;
  }
};

const enforceOrderCurrency = async ({ orderId, requestedCurrency }) => {
  const currency = normalizeCurrencyCode(requestedCurrency);
  const { default: wcApi } = await import('@/src/lib/woocommerce');
  const { data: updatedOrder } = await wcApi.put(`orders/${orderId}`, {
    currency,
    meta_data: [
      { key: '_dosalga_store_currency', value: currency },
    ],
  });

  return updatedOrder;
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

const buildRestOrderLineItems = (lineItems = []) => (
  lineItems.map((item) => {
    const productId = Number.parseInt(item?.product_id, 10);
    const variationId = Number.parseInt(item?.variation_id, 10);
    const quantity = Number.parseInt(item?.quantity, 10);

    return {
      product_id: productId,
      quantity,
      ...(Number.isFinite(variationId) && variationId > 0 ? { variation_id: variationId } : {}),
    };
  }).filter((item) => (
    Number.isFinite(item.product_id)
    && item.product_id > 0
    && Number.isFinite(item.quantity)
    && item.quantity > 0
  ))
);

const createUsdRestOrder = async ({
  req,
  billing,
  shipping,
  lineItems,
  requestedCurrency,
  customerNote,
  createAccount,
  accountPassword,
  couponCode,
  couponDiscountAmount,
  requestedMetaData,
}) => {
  const { default: wcApi } = await import('@/src/lib/woocommerce');
  const currency = normalizeCurrencyCode(requestedCurrency);
  const normalizedCouponCode = normalizeCouponCode(couponCode);
  const orderLineItems = buildRestOrderLineItems(lineItems);

  if (orderLineItems.length === 0) {
    throw new Error('Le panier ne contient aucun produit valide.');
  }

  let customerSyncResult = null;
  let accountCreationWarning = null;

  if (createAccount) {
    try {
      customerSyncResult = await createOrFindCustomer({
        wcApi,
        billing,
        shipping: shipping || billing,
        accountPassword,
      });
      accountCreationWarning = customerSyncResult.warning || null;
    } catch (customerSyncError) {
      console.error('Customer account sync warning:', customerSyncError);
      accountCreationWarning = `La commande est creee, mais le compte client WooCommerce n'a pas pu etre cree ou rattache: ${customerSyncError.message}`;
    }
  }

  const discountAmount = parseAmount(couponDiscountAmount, 0);
  const shouldApplySocioDiscount = isSocioCoupon(normalizedCouponCode) && discountAmount > 0;
  const orderMetaData = normalizeMetaData([
    ...normalizeMetaData(requestedMetaData),
    { key: '_dosalga_store_currency', value: currency },
    ...(shouldApplySocioDiscount
      ? [
          { key: 'dosalga_coupon_code', value: normalizedCouponCode },
          { key: 'dosalga_coupon_discount', value: discountAmount.toFixed(2) },
          { key: 'dosalga_coupon_type', value: 'percent' },
          { key: 'dosalga_coupon_rate', value: String(SOCIO_DISCOUNT_RATE) },
        ]
      : []),
  ]);

  const { data: order } = await wcApi.post('orders', {
    status: 'pending',
    currency,
    payment_method: 'stripe',
    payment_method_title: 'Credit card',
    set_paid: false,
    customer_id: customerSyncResult?.customer?.id || 0,
    billing,
    shipping: shipping || billing,
    customer_note: customerNote,
    line_items: orderLineItems,
    fee_lines: shouldApplySocioDiscount
      ? [{
          name: `Socio coupon -${SOCIO_DISCOUNT_PERCENT}%`,
          total: (-discountAmount).toFixed(2),
          taxable: false,
        }]
      : [],
    meta_data: orderMetaData,
  });

  if (normalizeCurrencyCode(order?.currency) !== currency) {
    throw new Error(`La commande n'est pas en ${currency}. Paiement stoppe.`);
  }

  return {
    order,
    paymentUrl: buildPaymentUrl(order.id, order.order_key, req),
    customerSyncResult,
    warning: accountCreationWarning,
    couponApplied: !isSocioCoupon(normalizedCouponCode) || shouldApplySocioDiscount,
  };
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
      currency: requestedCurrency = STORE_CURRENCY,
      customer_note: customerNote = '',
      create_account: createAccount = false,
      account_password: accountPassword = '',
      coupon_code: couponCode = '',
      coupon_discount_amount: couponDiscountAmount = 0,
      meta_data: requestedMetaData = [],
    } = orderData;

    try {
      const directOrder = await createUsdRestOrder({
        req,
        billing,
        shipping,
        lineItems,
        requestedCurrency,
        customerNote,
        createAccount,
        accountPassword,
        couponCode,
        couponDiscountAmount,
        requestedMetaData,
      });

      console.info(`[checkout:${debugId}] usd_order_ready_for_payment`, {
        orderId: directOrder.order.id,
        orderKey: directOrder.order.order_key,
        paymentUrl: directOrder.paymentUrl,
        currency: directOrder.order.currency || null,
        total: directOrder.order.total || null,
        billingCountry: billing?.country || null,
        billingState: billing?.state || null,
        couponApplied: directOrder.couponApplied,
        customerId: directOrder.customerSyncResult?.customer?.id || null,
        customerCreated: directOrder.customerSyncResult?.created ?? null,
      });

      return res.status(201).json({
        success: true,
        data: {
          ...directOrder.order,
          payment_url: directOrder.paymentUrl,
        },
        customer_id: directOrder.customerSyncResult?.customer?.id || null,
        customer_created: directOrder.customerSyncResult?.created ?? null,
        coupon_applied: directOrder.couponApplied,
        warning: directOrder.warning || null,
        message: 'Commande créée avec succès',
        debug_id: debugId,
      });
    } catch (directOrderError) {
      if (!isWooWritePermissionError(directOrderError)) {
        throw directOrderError;
      }

      console.warn(`[checkout:${debugId}] rest_order_write_denied_falling_back_to_store_api`, {
        status: directOrderError?.response?.status || directOrderError?.status || null,
        code: directOrderError?.response?.data?.code || directOrderError?.code || null,
        message: directOrderError?.response?.data?.message || directOrderError?.message || null,
      });
    }

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
          body: { code: normalizedCouponCode },
        }));
        isSocioDiscountApplied = true;
      } catch (storeCouponError) {
        console.error('Store coupon apply warning:', storeCouponError);
        couponSyncWarning = 'Coupon is active in the app but missing in WooCommerce coupons.';
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
    let customerSyncResult = null;
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

    let currencySyncWarning = null;
    let syncedOrderCurrency = order.currency_code || order.currency || null;

    try {
      const syncedOrder = await enforceOrderCurrency({
        orderId: order.order_id,
        requestedCurrency,
      });
      syncedOrderCurrency = syncedOrder?.currency || syncedOrderCurrency;
      if (CHECKOUT_DEBUG) {
        console.info(`[checkout:${debugId}] order_currency_synced`, {
          orderId: order.order_id,
          currency: syncedOrderCurrency,
        });
      }
    } catch (currencySyncError) {
      console.error('Order currency sync warning:', currencySyncError);
      currencySyncWarning = `La commande a ete creee, mais la devise n'a pas pu etre forcee en ${STORE_CURRENCY}. Paiement stoppe.`;
    }

    if (normalizeCurrencyCode(syncedOrderCurrency) !== normalizeCurrencyCode(requestedCurrency)) {
      return res.status(422).json({
        success: false,
        message: currencySyncWarning || `La commande n'est pas en ${STORE_CURRENCY}. Paiement stoppe.`,
        debug_id: debugId,
      });
    }

    if (createAccount) {
      try {
        const { default: wcApi } = await import('@/src/lib/woocommerce');
        customerSyncResult = await createOrFindCustomer({
          wcApi,
          billing,
          shipping: shipping || billing,
          accountPassword,
        });

        await wcApi.put(`orders/${order.order_id}`, {
          customer_id: customerSyncResult.customer.id,
          billing,
          shipping: shipping || billing,
        });

        if (customerSyncResult.warning) {
          accountCreationWarning = customerSyncResult.warning;
        }
      } catch (customerSyncError) {
        console.error('Customer account sync warning:', customerSyncError);
        accountCreationWarning = `La commande est creee, mais le compte client WooCommerce n'a pas pu etre cree ou rattache: ${customerSyncError.message}`;
      }
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
                  name: `Socio coupon -${SOCIO_DISCOUNT_PERCENT}%`,
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
          console.error('Coupon sync warning:', couponSyncError);
          couponSyncWarning = 'Coupon could not be synchronized on Woo order.';
        }
      }
    }

    if (isSocioCoupon(normalizedCouponCode) && !isSocioDiscountApplied) {
      return res.status(422).json({
        success: false,
        message: 'Le coupon n’est pas configuré côté WooCommerce.',
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
      currency: syncedOrderCurrency || order.currency_code || null,
      total: order.totals?.total_price || null,
      billingCountry: billing?.country || null,
      billingState: billing?.state || null,
      couponCode: normalizedCouponCode || null,
      couponApplied: isSocioDiscountApplied,
      customerId: customerSyncResult?.customer?.id || null,
      customerCreated: customerSyncResult?.created ?? null,
    });
    
    res.status(201).json({
      success: true,
      data: {
        ...order,
        id: order.order_id,
        payment_url: paymentUrl,
      },
      customer_id: customerSyncResult?.customer?.id || null,
      customer_created: customerSyncResult?.created ?? null,
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
