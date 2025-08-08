import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import PedidoConfirmado from "./pages/PedidoConfirmado";
import LoginPage from "./pages/LoginPage";
import CadastroUsuarioPage from "./pages/CadastroUsuarioPage";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import { Box } from "@mui/material";

function AppRoutes() {
  const { usuario } = useContext(AuthContext);

  return (
    <Routes>
      {!usuario ? (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<CadastroUsuarioPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      ) : (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/produtos" element={<ProductsPage />} />
          <Route path="/carrinho" element={<CartPage />} />
          <Route path="/pedido-confirmado" element={<PedidoConfirmado />} />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Box sx={{ pt: "64px", minHeight: "100vh", bgcolor: "#e3f2fd" }}>
            <AppRoutes />
          </Box>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
