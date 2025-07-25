import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import PedidoConfirmado from "./pages/PedidoConfirmado";
import { CartProvider } from "./contexts/CartContext";
import { Box } from "@mui/material";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Box sx={{ pt: "64px", minHeight: "100vh", bgcolor: "#e3f2fd" }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/produtos" element={<ProductsPage />} />
            <Route path="/carrinho" element={<CartPage />} />
            <Route path="/pedido-confirmado" element={<PedidoConfirmado />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </CartProvider>
  );
}
