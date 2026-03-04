import React from 'react';
import Link from 'next/link';
import { useCart } from '@/src/contexts/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const shipping = 0;
  const total = subtotal + shipping;

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
                            <p className="price">${itemPrice.toFixed(2)}</p>
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

                          <td data-label="Total">${lineTotal.toFixed(2)}</td>
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
                  <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-inner">
                      <input type="text" placeholder="Coupon Code" />
                      <button type="submit" className="primary-btn1 hover-btn3">Apply Code</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Cart Totals</th>
                    <th />
                    <th>${total.toFixed(2)}</th>
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
                        <li>${shipping.toFixed(2)}</li>
                        <li>${subtotal.toFixed(2)}</li>
                        <li>${total.toFixed(2)}</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td>Subtotal</td>
                    <td />
                    <td>${subtotal.toFixed(2)}</td>
                  </tr>
                </tbody>
              </table>

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
      `}</style>
    </>
  );
};

export default Cart;
