import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import SelectComponent from '@/src/components/common/SelectComponent';
import { useCart } from '@/src/contexts/CartContext';
import { formatUSDPrice } from '@/src/lib/pricing';
import { toast } from 'react-toastify';

const MEXICO_STATE_CITIES = {
  'Ciudad de Mexico': ['Alvaro Obregon', 'Benito Juarez', 'Coyoacan', 'Cuauhtemoc', 'Iztapalapa', 'Miguel Hidalgo'],
  'Estado de Mexico': ['Ecatepec', 'Naucalpan', 'Nezahualcoyotl', 'Toluca', 'Tlalnepantla'],
  Jalisco: ['Guadalajara', 'Zapopan', 'Tlaquepaque', 'Tonalá', 'Puerto Vallarta'],
  NuevoLeon: ['Monterrey', 'San Nicolas', 'Guadalupe', 'Apodaca', 'Santa Catarina'],
  Puebla: ['Puebla', 'Tehuacan', 'San Martin Texmelucan', 'Atlixco'],
  Queretaro: ['Santiago de Queretaro', 'San Juan del Rio', 'El Marques'],
  Guanajuato: ['Leon', 'Irapuato', 'Celaya', 'Salamanca', 'Guanajuato'],
  Veracruz: ['Veracruz', 'Xalapa', 'Coatzacoalcos', 'Cordoba'],
  Yucatan: ['Merida', 'Valladolid', 'Tizimin'],
  QuintanaRoo: ['Cancun', 'Playa del Carmen', 'Cozumel', 'Tulum'],
};

const Checkout = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const [billingCountry, setBillingCountry] = useState('Mexico');
  const [billingState, setBillingState] = useState('');
  const [billingCity, setBillingCity] = useState('');
  const subtotal = getCartTotal();
  const shipping = 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  const mexicoStates = useMemo(() => Object.keys(MEXICO_STATE_CITIES), []);
  const mexicoCities = useMemo(() => {
    if (!billingState) return [];
    return MEXICO_STATE_CITIES[billingState] || [];
  }, [billingState]);

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    if (cart.length === 0) {
      toast.warn('Your cart is empty.');
      return;
    }
    toast.info('Checkout form is ready. Payment integration is pending.');
  };

  return (
    <>
      <div className="checkout-section pt-110 mb-110">
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-7">
              <div className="form-wrap mb-30">
                <h4>Billing Details</h4>
                <form>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-inner">
                        <label>First Name</label>
                        <input type="text" name="fname" placeholder="Your first name" />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-inner">
                        <label>Last Name</label>
                        <input type="text" name="lname" placeholder="Your last name" />
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
                          <option value="Mexico">Mexico</option>
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="France">France</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <label>Street Address</label>
                        <input type="text" name="address" placeholder="House and street name" />
                      </div>
                    </div>
                    {billingCountry === 'Mexico' ? (
                      <>
                        <div className="col-md-6">
                          <div className="form-inner">
                            <label>State</label>
                            <select
                              name="state"
                              value={billingState}
                              onChange={(event) => {
                                setBillingState(event.target.value);
                                setBillingCity('');
                              }}
                            >
                              <option value="">Select a state</option>
                              {mexicoStates.map((state) => (
                                <option key={state} value={state}>
                                  {state}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-inner">
                            <label>Town / City</label>
                            <select
                              name="city"
                              value={billingCity}
                              onChange={(event) => setBillingCity(event.target.value)}
                              disabled={!billingState}
                            >
                              <option value="">
                                {billingState ? 'Select a city' : 'Select a state first'}
                              </option>
                              {mexicoCities.map((city) => (
                                <option key={city} value={city}>
                                  {city}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="col-md-6">
                          <div className="form-inner">
                            <label>State / Province</label>
                            <input type="text" name="state" placeholder="State / Province" />
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="form-inner">
                            <label>Town / City</label>
                            <input type="text" name="city" placeholder="Town / City" />
                          </div>
                        </div>
                      </>
                    )}
                    <div className="col-12">
                      <div className="form-inner">
                        <input type="text" name="postcode" placeholder="Post Code" />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <label>Additional Information</label>
                        <input type="text" name="phone" placeholder="Your Phone Number" />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <input type="email" name="email" placeholder="Your Email Address" />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <textarea name="message" placeholder="Order Notes (Optional)" rows={6} defaultValue="" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <div className="form-wrap box--shadow">
                <h4>Ship to a Different Address?</h4>
                <form>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>First Name</label>
                        <input type="text" name="ship_fname" placeholder="Your first name" />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-inner">
                        <label>Last Name</label>
                        <input type="text" name="ship_lname" placeholder="Your last name" />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-inner">
                        <textarea name="ship_message" placeholder="Order Notes (Optional)" rows={3} defaultValue="" />
                      </div>
                    </div>
                  </div>
                </form>
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
                            {item.variation?.size && (
                              <p className="variation-meta">Size: {item.variation.size}</p>
                            )}
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
                                <span className="product-price">{formatUSDPrice(itemPrice)}</span>
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

              <div className="cost-summary mb-30">
                <table className="table cost-summary-table">
                  <thead>
                    <tr>
                      <th>Subtotal</th>
                      <th>{formatUSDPrice(subtotal)}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="tax">Tax</td>
                      <td>{formatUSDPrice(tax)}</td>
                    </tr>
                    <tr>
                      <td>Total (tax excl.)</td>
                      <td>{formatUSDPrice(subtotal + shipping)}</td>
                    </tr>
                    <tr>
                      <td>Total (tax incl.)</td>
                      <td>{formatUSDPrice(total)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="cost-summary total-cost mb-30">
                <table className="table cost-summary-table total-cost">
                  <thead>
                    <tr>
                      <th>Total</th>
                      <th>{formatUSDPrice(total)}</th>
                    </tr>
                  </thead>
                </table>
              </div>

              <form className="payment-form" onSubmit={handlePlaceOrder}>
                <div className="payment-methods mb-30">
                  <ul className="payment-list">
                    <li className="check-payment">
                      <div className="form-check payment-check">
                        <h6>Check payments</h6>
                        <p className="para">Please send a check to Store Name, Store Street, Store State / Country, Store Postcode.</p>
                      </div>
                      <div className="checked" />
                    </li>
                    <li className="cash-delivary">
                      <div className="form-check payment-check">
                        <h6>Cash on delivery</h6>
                        <p className="para">Pay with cash upon delivery.</p>
                      </div>
                      <div className="checked" />
                    </li>
                    <li className="paypal">
                      <div className="form-check payment-check paypal">
                        <h6>Paypal</h6>
                        <img src="https://beautico-nextjs.vercel.app/assets/img/inner-page/payment.png" alt="" />
                        <a href="#" className="about-paypal">What is PayPal?</a>
                      </div>
                      <div className="checked" />
                    </li>
                    <li className="stripe">
                      <h6>Card</h6>
                      <div className="checked" />
                    </li>
                  </ul>

                  <div className="choose-payment-method pt-25 pb-25" id="strip-payment" style={{ display: 'none' }}>
                    <h5>Select Your Payment Method</h5>
                    <div className="row gy-4 g-4">
                      <div className="col-md-12">
                        <div className="input-area">
                          <label>Card Number</label>
                          <div className="input-field">
                            <input type="text" placeholder="1234 1234 1234 1234" />
                            <img src="https://beautico-nextjs.vercel.app/assets/img/inner-page/payment.png" alt="" />
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-7">
                        <div className="input-area">
                          <label>Expiration Date</label>
                          <div className="row gy-4">
                            <div className="col-sm-6">
                              <SelectComponent options={['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']} placeholder="Month" />
                            </div>
                            <div className="col-sm-6">
                              <SelectComponent options={['01', '02', '03', '04', '05', '06', '07']} placeholder="Day" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-5">
                        <div className="input-area">
                          <label>CVC</label>
                          <input type="text" placeholder="123" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="payment-form-bottom d-flex align-items-start">
                    <input type="checkbox" className="custom-check-box" id="terms" />
                    <label htmlFor="terms">I have read and agree to the website <a href="#">Terms and conditions</a></label>
                  </div>
                </div>
                <div className="place-order-btn">
                  <button type="submit" className="primary-btn1 hover-btn3" disabled={cart.length === 0}>Place Order</button>
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
      `}</style>
    </>
  );
};

export default Checkout;
