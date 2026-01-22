import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useCart } from "../../contexts/CartContext";

const CartUomo = () => {
  const [showCart, setShowCart] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cartButtonRef = useRef(null);
  const cartMenuRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle cart button click
  const handleCartButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowCart(!showCart);
  };

  // Close the cart when a click occurs outside of the cart area
  const handleOutsideClick = (event) => {
    if (
      cartMenuRef.current &&
      !cartMenuRef.current.contains(event.target) &&
      cartButtonRef.current &&
      !cartButtonRef.current.contains(event.target)
    ) {
      setShowCart(false);
    }
  };

  useEffect(() => {
    if (mounted) {
      document.addEventListener("click", handleOutsideClick);
      return () => {
        document.removeEventListener("click", handleOutsideClick);
      };
    }
  }, [mounted, showCart]);

  if (!mounted) {
    return (
      <button
        className="header-action-btn cart-btn"
        aria-label="Cart"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 5H17.5L16.25 15H3.75L2.5 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.5 5V3.75C7.5 2.78 8.28 2 9.25 2H10.75C11.72 2 12.5 2.78 12.5 3.75V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="8.75" cy="8.75" r="0.625" fill="currentColor"/>
          <circle cx="11.25" cy="8.75" r="0.625" fill="currentColor"/>
        </svg>
        <span className="cart-count">0</span>
      </button>
    );
  }

  return (
    <>
      <button
        ref={cartButtonRef}
        onClick={handleCartButtonClick}
        className="header-action-btn cart-btn"
        aria-label="Cart"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 5H17.5L16.25 15H3.75L2.5 5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7.5 5V3.75C7.5 2.78 8.28 2 9.25 2H10.75C11.72 2 12.5 2.78 12.5 3.75V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="8.75" cy="8.75" r="0.625" fill="currentColor"/>
          <circle cx="11.25" cy="8.75" r="0.625" fill="currentColor"/>
        </svg>
        <span className="cart-count">2</span>
      </button>
      
      <div
        ref={cartMenuRef}
        className={`cart-dropdown ${showCart ? "show" : ""}`}
      >
        <div className="cart-header">
          <h6>Shopping Cart (2)</h6>
          <button onClick={() => setShowCart(false)} className="close-cart">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        
        <div className="cart-items">
          <div className="cart-item">
            <div className="item-image">
              <img src="https://beautico-nextjs.vercel.app/assets/img/home1/cart-img-1.png" alt="Product" />
            </div>
            <div className="item-details">
              <h6>Estee Lauder Nail Polish</h6>
              <div className="item-price">
                <span className="sale-price">$150</span>
                <span className="regular-price">$200</span>
              </div>
              <div className="item-quantity">
                <button className="qty-btn">-</button>
                <span>1</span>
                <button className="qty-btn">+</button>
              </div>
            </div>
            <button className="remove-item">×</button>
          </div>

          <div className="cart-item">
            <div className="item-image">
              <img src="https://beautico-nextjs.vercel.app/assets/img/home1/cart-img-2.png" alt="Product" />
            </div>
            <div className="item-details">
              <h6>Argan & Olive Oil</h6>
              <div className="item-price">
                <span className="price">$318</span>
              </div>
              <div className="item-quantity">
                <button className="qty-btn">-</button>
                <span>1</span>
                <button className="qty-btn">+</button>
              </div>
            </div>
            <button className="remove-item">×</button>
          </div>
        </div>

        <div className="cart-footer">
          <div className="cart-totals">
            <div className="subtotal">
              <span>Sub Total</span>
              <span>$468</span>
            </div>
            <div className="discount">
              <span>Offer (20%)</span>
              <span>$56</span>
            </div>
            <div className="total">
              <span>Total</span>
              <span>$425</span>
            </div>
          </div>
          
          <div className="cart-actions">
            <Link legacyBehavior href="/shop">
              <a className="btn-secondary">Continue Shopping</a>
            </Link>
            <Link legacyBehavior href="/shop/checkout">
              <a className="btn-primary">Product Checkout</a>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cart-btn {
          position: relative;
        }

        .cart-count {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #000;
          color: #fff;
          font-size: 10px;
          font-weight: 600;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cart-dropdown {
          position: absolute;
          top: calc(100% + 20px);
          right: 0;
          width: 380px;
          background: #fff;
          border-radius: 8px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.3s ease;
          z-index: 1000;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
        }

        .cart-dropdown.show {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #eee;
        }

        .cart-header h6 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
        }

        .close-cart {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          color: #666;
          transition: color 0.3s ease;
        }

        .close-cart:hover {
          color: #000;
        }

        .cart-items {
          padding: 20px;
          max-height: 400px;
          overflow-y: auto;
        }

        .cart-item {
          display: flex;
          gap: 15px;
          margin-bottom: 20px;
          position: relative;
        }

        .item-image {
          width: 80px;
          height: 80px;
          flex-shrink: 0;
          border-radius: 8px;
          overflow: hidden;
        }

        .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .item-details {
          flex: 1;
        }

        .item-details h6 {
          font-size: 14px;
          font-weight: 600;
          margin: 0 0 8px 0;
        }

        .item-price {
          display: flex;
          gap: 8px;
          align-items: center;
          margin-bottom: 8px;
        }

        .price,
        .sale-price {
          font-size: 14px;
          font-weight: 600;
          color: #000;
        }

        .regular-price {
          font-size: 12px;
          color: #999;
          text-decoration: line-through;
        }

        .item-quantity {
          display: flex;
          gap: 8px;
          align-items: center;
        }

        .qty-btn {
          width: 24px;
          height: 24px;
          border: 1px solid #ddd;
          background: #fff;
          border-radius: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .qty-btn:hover {
          border-color: #000;
          background: #f8f8f8;
        }

        .item-quantity span {
          font-size: 14px;
          font-weight: 600;
          min-width: 20px;
          text-align: center;
        }

        .remove-item {
          position: absolute;
          top: 0;
          right: 0;
          background: none;
          border: none;
          font-size: 24px;
          color: #999;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          transition: color 0.3s ease;
        }

        .remove-item:hover {
          color: #ff4444;
        }

        .cart-footer {
          border-top: 1px solid #eee;
          padding: 20px;
        }

        .cart-totals {
          margin-bottom: 20px;
        }

        .subtotal,
        .discount,
        .total {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          font-size: 14px;
        }

        .total {
          font-size: 16px;
          font-weight: 700;
          padding-top: 10px;
          border-top: 1px solid #eee;
          margin-bottom: 0;
        }

        .cart-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .btn-primary,
        .btn-secondary {
          display: block;
          padding: 12px;
          text-align: center;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .btn-primary {
          background: #000;
          color: #fff;
        }

        .btn-primary:hover {
          background: #333;
        }

        .btn-secondary {
          background: transparent;
          color: #000;
          border: 1px solid #ddd;
        }

        .btn-secondary:hover {
          border-color: #000;
          background: #f8f8f8;
        }

        @media (max-width: 576px) {
          .cart-dropdown {
            width: calc(100vw - 40px);
            right: -80px;
          }
        }
      `}</style>
    </>
  );
};

export default CartUomo;
