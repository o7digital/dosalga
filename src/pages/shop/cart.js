import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '@/src/contexts/CartContext';
import { formatLocalizedPrice } from '@/src/lib/pricing';

const Cart = () => {
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
  } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState(null);

  const subtotal = getCartTotal();
  const discount = getDiscountAmount();
  const shipping = 0;
  const total = getCartTotalAfterDiscount() + shipping;
  const formatPrice = (value) => formatLocalizedPrice(value, { pathname: router.pathname });

  const handleApplyCoupon = async (event) => {
    event.preventDefault();
    const result = await applyCouponCode(couponInput);
    setCouponFeedback(result);
  };

  return (
    <>
      <div className="whistlist-section cart mt-110 mb-110">
        <div className="container">
          <div className="row mb-50">
            <div className="col-12">
              <div className="whistlist-table">
                <table className="eg-table2">
                  <thead>
                    <tr>
                      <th />
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.length === 0 && (
                      <tr>
                        <td colSpan={5} className="text-center py-5">
                          Your cart is empty.{' '}
                          <Link legacyBehavior href="/shop">
                            <a className="hover-underline">Continue shopping</a>
                          </Link>
                        </td>
                      </tr>
                    )}

                    {cart.map((item) => {
                      const key = `${item.id}-${item.variation?.id || 'base'}`;
                      const itemPrice = Number.parseFloat(item.price || 0);
                      const lineTotal = itemPrice * item.quantity;

                      return (
                        <tr key={key}>
                          <td>
                            <button
                              type="button"
                              className="delete-icon"
                              onClick={() => removeFromCart(item.id, item.variation)}
                            >
                              <i className="bi bi-x-lg" />
                            </button>
                          </td>

                          <td data-label="Product" className="table-product">
                            <div className="product-img">
                              <img src={item.image} alt={item.name} />
                            </div>
                            <div className="product-content">
                              <h6>{item.name}</h6>
                            </div>
                          </td>

                          <td data-label="Price">
                            <p className="price">{formatPrice(itemPrice)}</p>
                          </td>

                          <td data-label="Quantity">
                            <div className="cart-qty-wrap">
                              <button
                                type="button"
                                className="qty-btn"
                                onClick={() => updateQuantity(item.id, item.quantity - 1, item.variation)}
                              >
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button
                                type="button"
                                className="qty-btn"
                                onClick={() => updateQuantity(item.id, item.quantity + 1, item.variation)}
                              >
                                +
                              </button>
                            </div>
                          </td>

                          <td data-label="Total">{formatPrice(lineTotal)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="row g-4">
            <div className="col-lg-4">
              <div className="coupon-area">
                <div className="cart-coupon-input">
                  <h5>Coupon Code</h5>
                  <form onSubmit={handleApplyCoupon}>
                    <div className="form-inner">
                      <input
                        type="text"
                        placeholder="Coupon Code"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
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
                        Code actif: <strong>{appliedCoupon.label || 'Coupon'}</strong>
                      </span>
                      <button type="button" className="remove-coupon-btn" onClick={removeCouponCode}>
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Cart Totals</th>
                    <th />
                    <th>{formatPrice(total)}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Shipping</td>
                    <td>
                      <ul className="cost-list text-start">
                        <li>Shipping Fee</li>
                        <li>Total (tax excl.)</li>
                        <li>Total (tax incl.)</li>
                      </ul>
                    </td>
                    <td>
                      <ul className="single-cost text-center">
                        <li>{formatPrice(shipping)}</li>
                        <li>{formatPrice(subtotal)}</li>
                        <li>{formatPrice(total)}</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>Discount</td>
                    <td>{appliedCoupon ? (appliedCoupon.label || 'Coupon') : '—'}</td>
                    <td>-{formatPrice(discount)}</td>
                  </tr>
                  <tr>
                    <td>Subtotal</td>
                    <td />
                    <td>{formatPrice(subtotal)}</td>
                  </tr>
                  <tr>
                    <td>Total after discount</td>
                    <td />
                    <td>{formatPrice(total)}</td>
                  </tr>
                </tbody>
              </table>

              {appliedCoupon && (
                <p className="cost-note">
                  Coupon actif: remise appliquee.
                </p>
              )}

              <Link legacyBehavior href="/shop/checkout">
                <a className="primary-btn1 hover-btn3">Product Checkout</a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .delete-icon {
          background: transparent;
          border: none;
          cursor: pointer;
          color: inherit;
        }

        .cart-qty-wrap {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .qty-btn {
          width: 28px;
          height: 28px;
          border: 1px solid #ddd;
          background: #fff;
          border-radius: 4px;
          cursor: pointer;
        }

        .coupon-feedback {
          margin-top: 10px;
          font-size: 14px;
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

        .cost-note {
          margin: 12px 0 18px;
          color: #475569;
          font-size: 14px;
        }
      `}</style>
    </>
  );
};

export default Cart;
