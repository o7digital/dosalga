import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '@/src/contexts/CartContext';
import { formatMXNPrice } from '@/src/lib/pricing';
import { toast } from 'react-toastify';

const COUNTRY_OPTIONS = [
  { value: 'MX', label: 'Mexico' },
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'FR', label: 'France' },
  { value: 'OTHER', label: 'Other' },
];

const COUNTRY_STATES = {
  MX: [
    { code: 'AG', label: 'Aguascalientes' },
    { code: 'BC', label: 'Baja California' },
    { code: 'BS', label: 'Baja California Sur' },
    { code: 'CM', label: 'Campeche' },
    { code: 'CS', label: 'Chiapas' },
    { code: 'CH', label: 'Chihuahua' },
    { code: 'DF', label: 'Ciudad de Mexico' },
    { code: 'CO', label: 'Coahuila' },
    { code: 'CL', label: 'Colima' },
    { code: 'DG', label: 'Durango' },
    { code: 'GT', label: 'Guanajuato' },
    { code: 'GR', label: 'Guerrero' },
    { code: 'HG', label: 'Hidalgo' },
    { code: 'JA', label: 'Jalisco' },
    { code: 'MX', label: 'Estado de Mexico' },
    { code: 'MI', label: 'Michoacan' },
    { code: 'MO', label: 'Morelos' },
    { code: 'NA', label: 'Nayarit' },
    { code: 'NL', label: 'Nuevo Leon' },
    { code: 'OA', label: 'Oaxaca' },
    { code: 'PU', label: 'Puebla' },
    { code: 'QT', label: 'Queretaro' },
    { code: 'QR', label: 'Quintana Roo' },
    { code: 'SL', label: 'San Luis Potosi' },
    { code: 'SI', label: 'Sinaloa' },
    { code: 'SO', label: 'Sonora' },
    { code: 'TB', label: 'Tabasco' },
    { code: 'TM', label: 'Tamaulipas' },
    { code: 'TL', label: 'Tlaxcala' },
    { code: 'VE', label: 'Veracruz' },
    { code: 'YU', label: 'Yucatan' },
    { code: 'ZA', label: 'Zacatecas' },
  ],
  US: [
    { code: 'AL', label: 'Alabama' },
    { code: 'AK', label: 'Alaska' },
    { code: 'AZ', label: 'Arizona' },
    { code: 'AR', label: 'Arkansas' },
    { code: 'CA', label: 'California' },
    { code: 'CO', label: 'Colorado' },
    { code: 'CT', label: 'Connecticut' },
    { code: 'DE', label: 'Delaware' },
    { code: 'DC', label: 'District of Columbia' },
    { code: 'FL', label: 'Florida' },
    { code: 'GA', label: 'Georgia' },
    { code: 'HI', label: 'Hawaii' },
    { code: 'ID', label: 'Idaho' },
    { code: 'IL', label: 'Illinois' },
    { code: 'IN', label: 'Indiana' },
    { code: 'IA', label: 'Iowa' },
    { code: 'KS', label: 'Kansas' },
    { code: 'KY', label: 'Kentucky' },
    { code: 'LA', label: 'Louisiana' },
    { code: 'ME', label: 'Maine' },
    { code: 'MD', label: 'Maryland' },
    { code: 'MA', label: 'Massachusetts' },
    { code: 'MI', label: 'Michigan' },
    { code: 'MN', label: 'Minnesota' },
    { code: 'MS', label: 'Mississippi' },
    { code: 'MO', label: 'Missouri' },
    { code: 'MT', label: 'Montana' },
    { code: 'NE', label: 'Nebraska' },
    { code: 'NV', label: 'Nevada' },
    { code: 'NH', label: 'New Hampshire' },
    { code: 'NJ', label: 'New Jersey' },
    { code: 'NM', label: 'New Mexico' },
    { code: 'NY', label: 'New York' },
    { code: 'NC', label: 'North Carolina' },
    { code: 'ND', label: 'North Dakota' },
    { code: 'OH', label: 'Ohio' },
    { code: 'OK', label: 'Oklahoma' },
    { code: 'OR', label: 'Oregon' },
    { code: 'PA', label: 'Pennsylvania' },
    { code: 'RI', label: 'Rhode Island' },
    { code: 'SC', label: 'South Carolina' },
    { code: 'SD', label: 'South Dakota' },
    { code: 'TN', label: 'Tennessee' },
    { code: 'TX', label: 'Texas' },
    { code: 'UT', label: 'Utah' },
    { code: 'VT', label: 'Vermont' },
    { code: 'VA', label: 'Virginia' },
    { code: 'WA', label: 'Washington' },
    { code: 'WV', label: 'West Virginia' },
    { code: 'WI', label: 'Wisconsin' },
    { code: 'WY', label: 'Wyoming' },
  ],
  CA: [
    { code: 'AB', label: 'Alberta' },
    { code: 'BC', label: 'British Columbia' },
    { code: 'MB', label: 'Manitoba' },
    { code: 'NB', label: 'New Brunswick' },
    { code: 'NL', label: 'Newfoundland and Labrador' },
    { code: 'NT', label: 'Northwest Territories' },
    { code: 'NS', label: 'Nova Scotia' },
    { code: 'NU', label: 'Nunavut' },
    { code: 'ON', label: 'Ontario' },
    { code: 'PE', label: 'Prince Edward Island' },
    { code: 'QC', label: 'Quebec' },
    { code: 'SK', label: 'Saskatchewan' },
    { code: 'YT', label: 'Yukon' },
  ],
};

const SOCIO_COUPON_CODE = '2UP7NFF6';
const SOCIO_DISCOUNT_PERCENT = 90;

const Checkout = () => {
  const router = useRouter();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getDiscountAmount,
    getCartTotalAfterDiscount,
    appliedCoupon,
    applyCouponCode,
    removeCouponCode,
    createOrder,
    isLoading,
  } = useCart();
  const [billingCountry, setBillingCountry] = useState('MX');
  const [billingState, setBillingState] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const [billingFirstName, setBillingFirstName] = useState('');
  const [billingLastName, setBillingLastName] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [billingColony, setBillingColony] = useState('');
  const [billingPostcode, setBillingPostcode] = useState('');
  const [billingPhone, setBillingPhone] = useState('');
  const [billingEmail, setBillingEmail] = useState('');
  const [billingIdentityNumber, setBillingIdentityNumber] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState(null);
  const [shipToDifferentAddress, setShipToDifferentAddress] = useState(false);
  const [shippingFirstName, setShippingFirstName] = useState('');
  const [shippingLastName, setShippingLastName] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingColony, setShippingColony] = useState('');
  const [shippingCountry, setShippingCountry] = useState('MX');
  const [shippingState, setShippingState] = useState('');
  const [shippingCity, setShippingCity] = useState('');
  const [shippingPostcode, setShippingPostcode] = useState('');
  const [shippingPhone, setShippingPhone] = useState('');
  const [shippingIdentityNumber, setShippingIdentityNumber] = useState('');
  const [createAccount, setCreateAccount] = useState(false);
  const [accountPassword, setAccountPassword] = useState('');
  const subtotal = getCartTotal();
  const discount = getDiscountAmount();
  const shipping = 0;
  const tax = 0;
  const total = getCartTotalAfterDiscount() + shipping + tax;

  const billingStateOptions = useMemo(() => COUNTRY_STATES[billingCountry] || [], [billingCountry]);
  const shippingStateOptions = useMemo(() => COUNTRY_STATES[shippingCountry] || [], [shippingCountry]);
  const billingRequiresState = billingStateOptions.length > 0;
  const shippingRequiresState = shippingStateOptions.length > 0;
  const localeSegment = router.pathname.split('/')[1];
  const supportedLocales = ['es', 'de', 'fr', 'it', 'pt'];
  const localePrefix = supportedLocales.includes(localeSegment) ? `/${localeSegment}` : '';
  const termsPath = `${localePrefix}/terms-and-conditions`;
  const getOrderPaymentUrl = (order) => {
    if (order?.payment_url) return order.payment_url;
    if (order?.checkout_payment_url) return order.checkout_payment_url;

    return null;
  };
  const getIdentityLabel = (countryCode) => (countryCode === 'MX' ? 'CURP or TAX ID' : 'TAX ID');
  const normalizeIdentityValue = (value) => value.trim().toUpperCase();

  const handlePlaceOrder = async (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      toast.warn('Your cart is empty.');
      return;
    }

    if (!billingFirstName || !billingLastName || !billingAddress || !billingPhone || !billingEmail) {
      toast.warn('Please complete all required billing fields.');
      return;
    }
    if (!billingIdentityNumber.trim()) {
      toast.warn(`Please enter ${getIdentityLabel(billingCountry)}.`);
      return;
    }
    if (billingRequiresState && !billingState) {
      toast.warn('Please select a state or province.');
      return;
    }
    if (!billingCity.trim()) {
      toast.warn('Please enter a town or city.');
      return;
    }

    if (shipToDifferentAddress) {
      if (!shippingFirstName || !shippingLastName || !shippingAddress) {
        toast.warn('Please complete the required shipping fields.');
        return;
      }

      if (shippingRequiresState && !shippingState) {
        toast.warn('Please select a shipping state or province.');
        return;
      }
      if (!shippingCity.trim()) {
        toast.warn('Please enter a shipping town or city.');
        return;
      }
    }

    if (createAccount && accountPassword.length < 8) {
      toast.warn('Please enter a password of at least 8 characters to create your account.');
      return;
    }

    if (!termsAccepted) {
      toast.warn('You must accept the Terms & Conditions of Sale.');
      return;
    }

    try {
      const identityValue = normalizeIdentityValue(billingIdentityNumber);

      const billingInfo = {
        first_name: billingFirstName,
        last_name: billingLastName,
        address_1: billingAddress,
        address_2: billingColony,
        city: billingCity,
        state: billingState,
        postcode: billingPostcode,
        country: billingCountry === 'OTHER' ? '' : billingCountry,
        email: billingEmail,
        phone: billingPhone,
        customer_note: orderNotes,
        tax_id: identityValue,
      };
      const shippingInfo = shipToDifferentAddress
        ? {
            first_name: shippingFirstName,
            last_name: shippingLastName,
            address_1: shippingAddress,
            address_2: shippingColony,
            city: shippingCity,
            state: shippingState,
            postcode: shippingPostcode,
            country: shippingCountry === 'OTHER' ? '' : shippingCountry,
            phone: shippingPhone || billingPhone,
            tax_id: shippingIdentityNumber.trim() ? normalizeIdentityValue(shippingIdentityNumber) : '',
          }
        : billingInfo;

      const order = await createOrder(billingInfo, shippingInfo, {
        createAccount,
        accountPassword: createAccount ? accountPassword : '',
      });

      if (appliedCoupon?.code === SOCIO_COUPON_CODE && order?.coupon_applied === false) {
        throw new Error(order?.warning || `${SOCIO_COUPON_CODE} is not configured in WooCommerce coupons. Payment has been stopped.`);
      }

      if (order?.warning) {
        toast.warn(order.warning);
      }

      const paymentUrl = getOrderPaymentUrl(order);

      if (!paymentUrl) {
        throw new Error('Unable to retrieve WooCommerce payment URL.');
      }

      console.info('[checkout] redirect_to_payment', {
        debugId: order?.debug_id || null,
        orderId: order?.id || order?.order_id || null,
        paymentUrl,
        couponApplied: order?.coupon_applied ?? null,
      });

      toast.success('Redirecting to secure payment...');
      window.location.href = paymentUrl;
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error.message || 'Unable to start WooCommerce payment.');
    }
  };

  const handleApplyCoupon = (event) => {
    event.preventDefault();
    const result = applyCouponCode(couponInput);
    setCouponFeedback(result);
  };

  return (
    <>
      <div className="checkout-section pt-110 mb-110">
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-7">
              <div className="form-wrap mb-30">
                <h4>Payer / Card Billing Details</h4>
                <p className="checkout-helper">
                  Use the name and address of the person paying with the card. The delivery recipient can be different below.
                </p>
                <form>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-inner">
                        <label>Payer First Name</label>
                        <input type="text" name="fname" placeholder="Cardholder first name" value={billingFirstName} onChange={(event) => setBillingFirstName(event.target.value)} />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-inner">
                        <label>Payer Last Name</label>
                        <input type="text" name="lname" placeholder="Cardholder last name" value={billingLastName} onChange={(event) => setBillingLastName(event.target.value)} />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <label>Country / Region</label>
                        <select
                          name="country"
                          value={billingCountry}
                          onChange={(event) => {
                            const nextCountry = event.target.value;
                            setBillingCountry(nextCountry);
                            setBillingState('');
                            setBillingCity('');
                          }}
                        >
                          {COUNTRY_OPTIONS.map((country) => (
                            <option key={country.value} value={country.value}>
                              {country.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <label>Billing Street Address</label>
                        <input type="text" name="address" placeholder="Card billing street address" value={billingAddress} onChange={(event) => setBillingAddress(event.target.value)} />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <label>Colony / Colonia</label>
                        <input type="text" name="colony" placeholder="Neighborhood / Colonia" value={billingColony} onChange={(event) => setBillingColony(event.target.value)} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>State / Province</label>
                        {billingRequiresState ? (
                          <select
                            name="state"
                            value={billingState}
                            onChange={(event) => setBillingState(event.target.value)}
                          >
                            <option value="">Select a state / province</option>
                            {billingStateOptions.map((state) => (
                              <option key={state.code} value={state.code}>
                                {state.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input type="text" name="state" placeholder="State / Province" value={billingState} onChange={(event) => setBillingState(event.target.value)} />
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Town / City</label>
                        <input type="text" name="city" placeholder="Town / City" value={billingCity} onChange={(event) => setBillingCity(event.target.value)} />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <input type="text" name="postcode" placeholder="Post Code" value={billingPostcode} onChange={(event) => setBillingPostcode(event.target.value)} />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <label>Additional Information</label>
                        <input type="text" name="phone" placeholder="Payer phone number" value={billingPhone} onChange={(event) => setBillingPhone(event.target.value)} />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <label>{getIdentityLabel(billingCountry)}</label>
                        <input
                          type="text"
                          name="identity_number"
                          placeholder={billingCountry === 'MX' ? 'Payer CURP or TAX ID' : 'Payer TAX ID'}
                          value={billingIdentityNumber}
                          onChange={(event) => setBillingIdentityNumber(event.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <input type="email" name="email" placeholder="Payer email address" value={billingEmail} onChange={(event) => setBillingEmail(event.target.value)} />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <textarea name="message" placeholder="Order Notes (Optional)" rows={6} value={orderNotes} onChange={(event) => setOrderNotes(event.target.value)} />
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="form-wrap box--shadow">
                <div className="section-toggle">
                  <h4>Delivery Recipient</h4>
                  <label className="inline-check">
                    <input
                      type="checkbox"
                      checked={shipToDifferentAddress}
                      onChange={(event) => setShipToDifferentAddress(event.target.checked)}
                    />
                    <span>Send the order to someone different from the payer</span>
                  </label>
                </div>
                {shipToDifferentAddress && (
                  <form>
                    <div className="row">
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>First Name</label>
                        <input type="text" name="ship_fname" placeholder="Recipient first name" value={shippingFirstName} onChange={(event) => setShippingFirstName(event.target.value)} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Last Name</label>
                        <input type="text" name="ship_lname" placeholder="Recipient last name" value={shippingLastName} onChange={(event) => setShippingLastName(event.target.value)} />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <label>Country / Region</label>
                        <select
                          name="ship_country"
                          value={shippingCountry}
                          onChange={(event) => {
                            const nextCountry = event.target.value;
                            setShippingCountry(nextCountry);
                            setShippingState('');
                            setShippingCity('');
                          }}
                        >
                          {COUNTRY_OPTIONS.map((country) => (
                            <option key={country.value} value={country.value}>
                              {country.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <label>Street Address</label>
                        <input type="text" name="ship_address" placeholder="Delivery street address" value={shippingAddress} onChange={(event) => setShippingAddress(event.target.value)} />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <label>Colony / Colonia</label>
                        <input type="text" name="ship_colony" placeholder="Neighborhood / Colonia" value={shippingColony} onChange={(event) => setShippingColony(event.target.value)} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>State / Province</label>
                        {shippingRequiresState ? (
                          <select
                            name="ship_state"
                            value={shippingState}
                            onChange={(event) => setShippingState(event.target.value)}
                          >
                            <option value="">Select a state / province</option>
                            {shippingStateOptions.map((state) => (
                              <option key={state.code} value={state.code}>
                                {state.label}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input type="text" name="ship_state" placeholder="State / Province" value={shippingState} onChange={(event) => setShippingState(event.target.value)} />
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Town / City</label>
                        <input type="text" name="ship_city" placeholder="Town / City" value={shippingCity} onChange={(event) => setShippingCity(event.target.value)} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Post Code</label>
                        <input type="text" name="ship_postcode" placeholder="Post Code" value={shippingPostcode} onChange={(event) => setShippingPostcode(event.target.value)} />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Phone</label>
                        <input type="text" name="ship_phone" placeholder="Recipient phone (optional)" value={shippingPhone} onChange={(event) => setShippingPhone(event.target.value)} />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <label>Shipping {getIdentityLabel(shippingCountry)} (optional)</label>
                        <input
                          type="text"
                          name="ship_identity_number"
                          placeholder={shippingCountry === 'MX' ? 'Recipient CURP or TAX ID (optional)' : 'Recipient TAX ID (optional)'}
                          value={shippingIdentityNumber}
                          onChange={(event) => setShippingIdentityNumber(event.target.value)}
                        />
                      </div>
                    </div>
                    </div>
                  </form>
                )}
              </div>
            </div>

            <div className="col-lg-5">
              <div className="added-product-summary mb-30">
                <h5>Order Summary</h5>
                <ul className="added-products">
                  {cart.length === 0 && (
                    <li className="single-product empty-product">
                      <div className="product-info">
                        <h5>Your cart is empty</h5>
                        <p>Add products before checkout.</p>
                        <Link legacyBehavior href="/shop">
                          <a className="primary-btn1 hover-btn3">Go to shop</a>
                        </Link>
                      </div>
                    </li>
                  )}

                  {cart.map((item) => {
                    const key = `${item.id}-${item.variation?.id || item.variation?.size || 'base'}`;
                    const itemPrice = Number.parseFloat(item.price || 0);

                    return (
                      <li key={key} className="single-product">
                        <div className="product-area">
                          <div className="product-img">
                            <img src={item.image} alt={item.name} />
                          </div>
                          <div className="product-info">
                            <h5>
                              <Link legacyBehavior href={`/shop/product/${item.id}`}>
                                <a>{item.name}</a>
                              </Link>
                            </h5>
                            {item.variation?.attributes ? (
                              Object.entries(item.variation.attributes).map(([attributeName, attributeValue]) => (
                                <p key={`${key}-${attributeName}`} className="variation-meta">
                                  {attributeName}: {attributeValue}
                                </p>
                              ))
                            ) : item.variation?.size ? (
                              <p className="variation-meta">Size: {item.variation.size}</p>
                            ) : null}
                            <div className="product-total">
                              <div className="quantity-counter">
                                <button
                                  type="button"
                                  className="quantity__minus"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1, item.variation)}
                                >
                                  <i className="bx bx-minus" />
                                </button>
                                <input
                                  name={`quantity-${key}`}
                                  type="text"
                                  className="quantity__input"
                                  value={item.quantity}
                                  readOnly
                                />
                                <button
                                  type="button"
                                  className="quantity__plus"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1, item.variation)}
                                >
                                  <i className="bx bx-plus" />
                                </button>
                              </div>
                              <strong>
                                <i className="bi bi-x-lg px-2" />
                                <span className="product-price">{formatMXNPrice(itemPrice)}</span>
                              </strong>
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => removeFromCart(item.id, item.variation)}
                          aria-label={`Remove ${item.name}`}
                        >
                          <i className="bx bx-x" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="coupon-area mb-30">
                <div className="cart-coupon-input">
                  <h5>Coupon Code</h5>
                  <form onSubmit={handleApplyCoupon}>
                    <div className="form-inner">
                      <input
                        type="text"
                        placeholder={`Coupon Code (${SOCIO_COUPON_CODE})`}
                        value={couponInput}
                        onChange={(event) => setCouponInput(event.target.value)}
                      />
                      <button type="submit" className="primary-btn1 hover-btn3">Apply Code</button>
                    </div>
                  </form>
                  {couponFeedback?.message && (
                    <p className={`coupon-feedback ${couponFeedback.success ? 'ok' : 'error'}`}>
                      {couponFeedback.message}
                    </p>
                  )}
                  {appliedCoupon && (
                    <div className="active-coupon">
                      <span>
                        Code actif: <strong>{appliedCoupon.code}</strong> (-{SOCIO_DISCOUNT_PERCENT}%)
                      </span>
                      <button type="button" className="remove-coupon-btn" onClick={removeCouponCode}>
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="cost-summary mb-30">
                <table className="table cost-summary-table">
                  <thead>
                    <tr>
                      <th>Subtotal</th>
                      <th>{formatMXNPrice(subtotal)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="tax">Tax</td>
                      <td>{formatMXNPrice(tax)}</td>
                    </tr>
                    <tr>
                      <td>Total (tax excl.)</td>
                      <td>{formatMXNPrice(subtotal + shipping)}</td>
                    </tr>
                    <tr>
                      <td>Total (tax incl.)</td>
                      <td>{formatMXNPrice(total)}</td>
                    </tr>
                    <tr>
                      <td>Discount</td>
                      <td>{appliedCoupon ? `-${formatMXNPrice(discount)}` : '—'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="cost-summary total-cost mb-30">
                <table className="table cost-summary-table total-cost">
                  <thead>
                    <tr>
                      <th>Total</th>
                      <th>{formatMXNPrice(total)}</th>
                    </tr>
                  </thead>
                </table>
              </div>

              <form className="payment-form" onSubmit={handlePlaceOrder}>
                <div className="payment-methods mb-30">
                  <div className="payment-list">
                    <div className="account-option">
                      <label className="inline-check">
                        <input
                          type="checkbox"
                          checked={createAccount}
                          onChange={(event) => setCreateAccount(event.target.checked)}
                        />
                        <span>Create your account</span>
                      </label>
                      {createAccount && (
                        <div className="form-inner account-password">
                          <input
                            type="password"
                            name="account_password"
                            placeholder="Account password"
                            value={accountPassword}
                            onChange={(event) => setAccountPassword(event.target.value)}
                          />
                        </div>
                      )}
                    </div>
                    <div className="stripe active-payment">
                      <div className="form-check payment-check card-only">
                        <div>
                          <h6>Card Payment</h6>
                          <p className="para">Your banking details will be collected on the secure WooCommerce Stripe payment page after you place the order.</p>
                        </div>
                        <div className="card-brands" aria-label="Accepted cards">
                          <img src="/assets/img/home1/icon/visa.png" alt="Visa" />
                          <img src="/assets/img/home1/icon/mastercard.png" alt="Mastercard" />
                          <img src="/assets/img/home1/icon/american-express.png" alt="American Express" />
                        </div>
                      </div>
                      <div className="checked checked--active" />
                    </div>
                  </div>

                  <div className="payment-form-bottom d-flex align-items-start">
                    <input type="checkbox" className="custom-check-box" id="terms" checked={termsAccepted} onChange={(event) => setTermsAccepted(event.target.checked)} />
                    <label htmlFor="terms">
                      I have read and agree to the{' '}
                      <Link legacyBehavior href={termsPath}>
                        <a>Terms &amp; Conditions of Sale</a>
                      </Link>
                    </label>
                  </div>
                </div>
                <div className="place-order-btn">
                  <button type="submit" className="primary-btn1 hover-btn3" disabled={cart.length === 0 || isLoading}>
                    {isLoading ? 'Redirecting...' : 'Place Order'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .form-inner select {
          width: 100%;
          min-height: 52px;
          border: 1px solid #ddd;
          border-radius: 6px;
          padding: 0 14px;
          background: #fff;
          color: #111;
        }

        .form-inner select:disabled {
          background: #f5f5f5;
          color: #777;
          cursor: not-allowed;
        }

        .section-toggle {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 18px;
        }

        .section-toggle h4 {
          margin-bottom: 0;
        }

        .inline-check {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          color: #111;
          line-height: 1.35;
        }

        .inline-check input {
          width: 16px;
          height: 16px;
          flex: 0 0 auto;
        }

        .account-option {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 16px 18px;
          margin-bottom: 16px;
          background: #fff;
        }

        .account-password {
          margin-top: 14px;
        }

        .delete-btn {
          border: 0;
          background: transparent;
          cursor: pointer;
        }

        .quantity-counter button {
          border: 0;
          background: transparent;
          cursor: pointer;
          padding: 0;
        }

        .quantity__input {
          pointer-events: none;
        }

        .variation-meta {
          margin: 2px 0 0;
          font-size: 13px;
          color: #666;
        }

        .empty-product .product-info {
          width: 100%;
        }

        .empty-product .product-info p {
          margin: 8px 0 16px;
          color: #666;
        }

        .card-only {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .card-brands {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .card-brands img {
          height: 22px;
          width: auto;
          display: block;
        }

        .active-payment {
          border: 1px solid #111;
          border-radius: 8px;
          padding: 18px 18px 14px;
        }

        .checked--active {
          background: #111;
          border-radius: 50%;
          width: 14px;
          height: 14px;
          margin-top: 4px;
        }

        .coupon-feedback {
          margin-top: 10px;
          font-size: 14px;
        }
        .checkout-helper {
          margin: -10px 0 24px;
          color: var(--paragraph-color);
          font-size: 14px;
          line-height: 1.5;
        }

        .coupon-feedback.ok {
          color: #15803d;
        }

        .coupon-feedback.error {
          color: #b91c1c;
        }

        .active-coupon {
          margin-top: 8px;
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .remove-coupon-btn {
          border: 1px solid #ddd;
          background: #fff;
          border-radius: 4px;
          padding: 4px 8px;
          font-size: 12px;
        }
      `}</style>
    </>
  );
};

export default Checkout;
