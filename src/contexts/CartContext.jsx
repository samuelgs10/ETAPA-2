// src/contexts/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro do CartProvider");
  }
  return context;
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    // Pega do localStorage na inicialização
    try {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Salva no localStorage sempre que cartItems mudar
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Adiciona produto ao carrinho, somando quantidade se já existir
  function addToCart(product) {
    setCartItems((oldItems) => {
      const index = oldItems.findIndex((item) => item.id === product.id);
      if (index !== -1) {
        // Produto já existe, aumenta quantidade
        const updated = [...oldItems];
        updated[index].quantity += product.quantity;
        return updated;
      } else {
        // Produto novo
        return [...oldItems, product];
      }
    });
  }

  // Remove produto pelo id
  function removeFromCart(productId) {
    setCartItems((oldItems) => oldItems.filter((item) => item.id !== productId));
  }

  // Limpa todo o carrinho
  function clearCart() {
    setCartItems([]);
  }

  // Total de itens no carrinho (somando quantidades)
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}
