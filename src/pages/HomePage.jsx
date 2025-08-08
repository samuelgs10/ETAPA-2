// src/pages/HomePage.jsx
import React, { useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function HomePage() {
  const { usuario, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!usuario) {
      navigate("/login");
    }
  }, [usuario, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#e3f2fd" }}>
      {/* HEADER FIXO, COM NOME DA LOJA E BOTÃO SAIR */}
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "#1565c0",
          width: "100%",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", color: "white" }}
          >
            Tech Store
          </Typography>

          {usuario && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="body1" sx={{ color: "white" }}>
                Bem-vindo, {usuario}!
              </Typography>
              <Button
                onClick={handleLogout}
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Sair
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* CORPO DA PÁGINA EM TELA CHEIA */}
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          pt: "64px", // Compensa altura do AppBar fixo
          px: 2,
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "#0d47a1", textShadow: "1px 1px 2px rgba(0,0,0,0.1)" }}
        >
          Bem-vindo à Tech Store!
        </Typography>

        <Typography
          variant="h6"
          color="#1976d2"
          sx={{ mb: 4, maxWidth: 600 }}
        >
          A melhor loja para encontrar os últimos lançamentos da Apple com os
          melhores preços do mercado.
        </Typography>

        <Button
          component={Link}
          to="/produtos"
          variant="contained"
          sx={{
            bgcolor: "#1976d2",
            "&:hover": { bgcolor: "#0d47a1" },
            fontWeight: "bold",
            px: 4,
            py: 1.5,
            borderRadius: 2,
          }}
        >
          Ver Produtos
        </Button>
      </Box>
    </Box>
  );
}
