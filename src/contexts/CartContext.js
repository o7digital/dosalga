/**
 * Context pour gérer le panier d'achats
 */
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
const SOCIO_COUPON_CODE = 'SOCIO';
const SOCIO_MARGIN_DISCOUNT_RATE = 0.95;
const DEFAULT_MARGIN_RATE = 0.35;

const normalizeRate = (value, fallback) => {
  const parsedValue = Number.parseFloat(value);
  if (!Number.isFinite(parsedValue)) return fallback;
  if (parsedValue < 0) return 0;
  if (parsedValue > 1) return 1;
  return parsedValue;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const fallbackMarginRate = normalizeRate(process.env.NEXT_PUBLIC_SOCIO_MARGIN_RATE, DEFAULT_MARGIN_RATE);

  // Charger le panier depuis localStorage au démarrage
  useEffect(() => {
    const savedCart = localStorage.getItem('dosalga_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
        localStorage.removeItem('dosalga_cart');
      }
    }

    const savedCoupon = localStorage.getItem('dosalga_coupon');
    if (savedCoupon) {
      try {
        setAppliedCoupon(JSON.parse(savedCoupon));
      } catch (error) {
        console.error('Error loading coupon:', error);
        localStorage.removeItem('dosalga_coupon');
      }
    }
  }, []);

  // Sauvegarder le panier dans localStorage à chaque modification
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('dosalga_cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('dosalga_cart');
    }
  }, [cart]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('dosalga_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('dosalga_coupon');
    }
  }, [appliedCoupon]);

  // Ajouter un produit au panier
  const addToCart = (product, quantity = 1, variation = null) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => 
          item.id === product.id && 
          JSON.stringify(item.variation) === JSON.stringify(variation)
      );

      if (existingItemIndex > -1) {
        // Si le produit existe déjà, augmenter la quantité
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      } else {
        // Sinon, ajouter le nouveau produit
        return [
          ...prevCart,
          {
            id: product.id,
            name: product.name,
            price: parseFloat(product.price),
            image: product.images?.[0]?.src || '/assets/img/placeholder.png',
            quantity,
            variation,
            stock_status: product.stock_status
          }
        ];
      }
    });
  };

  // Retirer un produit du panier
  const removeFromCart = (productId, variation = null) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => 
          !(item.id === productId && 
            JSON.stringify(item.variation) === JSON.stringify(variation))
      )
    );
  };

  // Mettre à jour la quantité d'un produit
  const updateQuantity = (productId, quantity, variation = null) => {
    if (quantity <= 0) {
      removeFromCart(productId, variation);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && 
        JSON.stringify(item.variation) === JSON.stringify(variation)
          ? { ...item, quantity }
          : item
      )
    );
  };

  // Vider le panier
  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCouponCode = (rawCode = '') => {
    const normalizedCode = rawCode.trim().toUpperCase();

    if (!normalizedCode) {
      return { success: false, message: 'Veuillez saisir un code promo.' };
    }

    if (normalizedCode === SOCIO_COUPON_CODE || normalizedCode === `${SOCIO_COUPON_CODE}95`) {
      setAppliedCoupon({
        code: SOCIO_COUPON_CODE,
        label: 'Remise socios',
        type: 'margin_percent',
        rate: SOCIO_MARGIN_DISCOUNT_RATE,
      });
      return { success: true, message: 'Code SOCIO appliqué: -95% sur la marge.' };
    }

    return { success: false, message: 'Code promo invalide.' };
  };

  const removeCouponCode = () => {
    setAppliedCoupon(null);
  };

  // Calculer le total du panier
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getDiscountAmount = () => {
    if (!appliedCoupon || appliedCoupon.type !== 'margin_percent') {
      return 0;
    }

    return cart.reduce((discountTotal, item) => {
      const itemPrice = Number.parseFloat(item.price || 0);
      const margin = Math.max(0, itemPrice * fallbackMarginRate);
      const discountPerItem = margin * appliedCoupon.rate;
      return discountTotal + discountPerItem * item.quantity;
    }, 0);
  };

  const getCartTotalAfterDiscount = () => {
    const subtotal = getCartTotal();
    const discount = getDiscountAmount();
    return Math.max(0, subtotal - discount);
  };

  // Compter le nombre total d'articles
  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Créer une commande WooCommerce
  const createOrder = async (billingInfo, shippingInfo = null) => {
    setIsLoading(true);
    try {
      const orderData = {
        payment_method: 'bacs',
        payment_method_title: 'Virement bancaire',
        set_paid: false,
        billing: billingInfo,
        shipping: shippingInfo || billingInfo,
        fee_lines: appliedCoupon?.code === SOCIO_COUPON_CODE
          ? [{
              name: `${SOCIO_COUPON_CODE} -95% margin`,
              total: `-${getDiscountAmount().toFixed(2)}`,
              taxable: false,
            }]
          : [],
        meta_data: appliedCoupon?.code === SOCIO_COUPON_CODE
          ? [
              { key: 'dosalga_coupon_code', value: SOCIO_COUPON_CODE },
              { key: 'dosalga_coupon_type', value: 'margin_percent' },
            ]
          : [],
        line_items: cart.map((item) => ({
          product_id: item.id,
          quantity: item.quantity,
          variation_id: item.variation?.id || 0
        })),
      };

      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Erreur lors de la création de la commande');
      }

      // Vider le panier après une commande réussie
      clearCart();

      return result.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    cart,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getDiscountAmount,
    getCartTotalAfterDiscount,
    getCartItemsCount,
    appliedCoupon,
    applyCouponCode,
    removeCouponCode,
    createOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
