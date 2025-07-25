// src/pages/ProductsPage.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
  Container,
  Link as MuiLink,
  TextField,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function ProductsPage() {
  const { addToCart, cartItems } = useCart();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const category = "smartphones";
  const limit = 20;
  const apiUrl = `https://dummyjson.com/products/category/${category}?limit=${limit}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        const applePhones = data.products.filter(
          (p) => p.brand && p.brand.toLowerCase() === "apple"
        );
        const phonesWithPrices = applePhones.map((p) => ({
          ...p,
          pricePix: p.price * 0.9,
          pricePrazo: p.price,
        }));
        setProducts(phonesWithPrices);
      })
      .catch((err) => console.error(err));
  }, []);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Calcula valor total considerando pricePix * quantidade
  const totalValue = cartItems.reduce(
    (sum, item) => sum + item.pricePix * item.quantity,
    0
  );

  // Filtra produtos pelo título conforme searchTerm (case insensitive)
  const filteredProducts = products.filter((prod) =>
    prod.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5faff" }}>
      {/* APPBAR FIXO */}
      <AppBar
        position="fixed"
        sx={{ bgcolor: "#1565c0", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <MuiLink
              component={Link}
              to="/"
              color="white"
              underline="none"
              sx={{ fontWeight: "bold", cursor: "pointer" }}
            >
              Início
            </MuiLink>
            <MuiLink
              component={Link}
              to="/produtos"
              color="white"
              underline="none"
              sx={{ fontWeight: "bold", cursor: "pointer" }}
            >
              Produtos
            </MuiLink>
          </Box>

          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
              flexGrow: 1,
            }}
          >
            Tech Store
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <IconButton component={Link} to="/carrinho" sx={{ color: "white" }}>
              <Badge badgeContent={totalItems} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Typography
              variant="caption"
              sx={{ color: "white", fontWeight: "bold", mt: 0.5 }}
            >
              R$ {totalValue.toFixed(2).replace(".", ",")}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Barra de pesquisa centralizada logo abaixo do AppBar */}
      <Box
        sx={{
          mt: 10,
          mb: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
        }}
      >
        <TextField
          size="small"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            bgcolor: "white",
            borderRadius: 1,
            width: 250,
            "& .MuiInputBase-input": {
              fontSize: "0.875rem",
              padding: "6px 10px",
            },
          }}
        />
        <Button
          variant="outlined"
          size="small"
          onClick={() => setSearchTerm("")}
          sx={{ height: 32, fontWeight: "bold" }}
        >
          CLEAR
        </Button>
      </Box>

      <Container maxWidth="lg" sx={{ pb: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          fontFamily="Arial, sans-serif"
          color="#0d47a1"
        >
          Celulares Apple
        </Typography>

        <Grid container spacing={2}>
          {filteredProducts.length === 0 ? (
            <Typography>Nenhum celular Apple encontrado.</Typography>
          ) : (
            filteredProducts.map((prod) => (
              <Grid item xs={12} sm={6} md={4} key={prod.id}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    boxShadow: 3,
                    borderRadius: 2,
                    border: "1px solid #90caf9",
                    "&:hover": {
                      boxShadow: 6,
                      transform: "scale(1.03)",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={prod.thumbnail}
                    alt={prod.title}
                    sx={{ objectFit: "contain", bgcolor: "#e3f2fd", p: 1 }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                      color="#1976d2"
                    >
                      {prod.title.length > 60
                        ? prod.title.slice(0, 60) + "..."
                        : prod.title}
                    </Typography>
                    <Typography variant="body2" color="#1565c0" sx={{ mb: 1 }}>
                      Preço: R$ {prod.price.toFixed(2).replace(".", ",")}
                    </Typography>
                    <Typography variant="body2" color="#1565c0" sx={{ mb: 1 }}>
                      PIX: R$ {prod.pricePix.toFixed(2).replace(".", ",")}
                    </Typography>
                  </CardContent>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => addToCart({ ...prod, quantity: 1 })}
                    sx={{
                      m: 1,
                      bgcolor: "#1976d2",
                      "&:hover": { bgcolor: "#0d47a1" },
                    }}
                  >
                    Adicionar ao Carrinho
                  </Button>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
}
