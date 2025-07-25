import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function Header() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <AppBar position="fixed" sx={{ bgcolor: "#1565c0", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Link to="/" style={{ color: "white", fontWeight: "bold", textDecoration: "none" }}>Início</Link>
          <Link to="/produtos" style={{ color: "white", fontWeight: "bold", textDecoration: "none" }}>Produtos</Link>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "white", flexGrow: 1, textAlign: "center" }}>
          Tech Store
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton component={Link} to="/carrinho" sx={{ color: "white" }}>
            <Badge badgeContent={totalItems} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
