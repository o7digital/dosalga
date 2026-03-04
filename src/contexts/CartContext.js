/**
 * Context pour gérer le panier d'achats
 */
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

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
  }, []);

  // Sauvegarder le panier dans localStorage à chaque modification
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('dosalga_cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('dosalga_cart');
    }
  }, [cart]);

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
  };

  // Calculer le total du panier
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
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
    getCartItemsCount,
    createOrder,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
