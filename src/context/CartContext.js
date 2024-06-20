// CartContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(
          "https://0946-102-210-40-234.ngrok-free.app/cart"
        );
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items", error);
      }
    };

    fetchCartItems();
  }, []);

  const addItemToCart = async (product) => {
    try {
      await axios.post(
        "https://0946-102-210-40-234.ngrok-free.app/cart",
        product
      );
      setCartItems((prevCartItems) => {
        const existingProduct = prevCartItems.find(
          (item) => item.id === product.id
        );
        if (existingProduct) {
          return prevCartItems.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          return [...prevCartItems, { ...product, quantity: 1 }];
        }
      });
    } catch (error) {
      console.error("Error adding item to cart", error);
    }
  };

  const removeItemFromCart = async (productId) => {
    try {
      await axios.delete(
        `https://0946-102-210-40-234.ngrok-free.app/cart/${productId}`
      );
      setCartItems(cartItems.filter((item) => item.id !== productId));
    } catch (error) {
      console.error("Error removing item from cart", error);
    }
  };

  const increaseQuantity = async (productId) => {
    try {
      await axios.patch(
        `https://0946-102-210-40-234.ngrok-free.app/cart/${productId}/increase`
      );
      setCartItems(
        cartItems.map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } catch (error) {
      console.error("Error increasing item quantity", error);
    }
  };

  const decreaseQuantity = async (productId) => {
    try {
      await axios.patch(
        `https://0946-102-210-40-234.ngrok-free.app/cart/${productId}/decrease`
      );
      setCartItems(
        cartItems.map((item) =>
          item.id === productId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } catch (error) {
      console.error("Error decreasing item quantity", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
