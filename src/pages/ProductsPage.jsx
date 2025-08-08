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
  CardActions,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function ProductsPage() {
  const { addToCart, cartItems } = useCart();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Campos do CRUD
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [editIndex, setEditIndex] = useState(null);

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
  const totalValue = cartItems.reduce(
    (sum, item) => sum + item.pricePix * item.quantity,
    0
  );

  const filteredProducts = products.filter((prod) =>
    prod.title
      ? prod.title.toLowerCase().includes(searchTerm.toLowerCase())
      : prod.nome?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Adicionar ou atualizar produto manual
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !preco || !thumbnail) return;

    if (editIndex !== null) {
      const novos = [...products];
      novos[editIndex] = {
        nome,
        price: parseFloat(preco),
        pricePix: parseFloat(preco) * 0.9,
        thumbnail,
      };
      setProducts(novos);
      setEditIndex(null);
    } else {
      setProducts([
        ...products,
        {
          nome,
          price: parseFloat(preco),
          pricePix: parseFloat(preco) * 0.9,
          thumbnail,
        },
      ]);
    }
    setNome("");
    setPreco("");
    setThumbnail("");
  };

  const handleEdit = (index) => {
    const p = products[index];
    setNome(p.title || p.nome);
    setPreco(p.price);
    setThumbnail(p.thumbnail);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

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

      {/* Formulário CRUD */}
      <Container sx={{ mt: 12, mb: 4, bgcolor: "white", p: 2, borderRadius: 2, boxShadow: 2 }}>
        <Typography variant="h6" color="#1565c0" mb={2}>
          {editIndex !== null ? "Atualizar Produto" : "Adicionar Produto"}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}
        >
          <TextField
            label="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            size="small"
            required
          />
          <TextField
            label="Preço"
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            size="small"
            required
          />
          <TextField
            label="Imagem (URL)"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            size="small"
            required
          />
          <Button type="submit" variant="contained" color="primary">
            {editIndex !== null ? "Atualizar" : "Adicionar"}
          </Button>
        </Box>
      </Container>

      {/* Barra de pesquisa */}
      <Box
        sx={{
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

      {/* Lista de produtos */}
      <Container maxWidth="lg" sx={{ pb: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          fontFamily="Arial, sans-serif"
          color="#0d47a1"
        >
          Celulares Apple & Produtos Adicionados
        </Typography>

        <Grid container spacing={2}>
          {filteredProducts.length === 0 ? (
            <Typography>Nenhum produto encontrado.</Typography>
          ) : (
            filteredProducts.map((prod, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
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
                    alt={prod.title || prod.nome}
                    sx={{ objectFit: "contain", bgcolor: "#e3f2fd", p: 1 }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                      color="#1976d2"
                    >
                      {prod.title || prod.nome}
                    </Typography>
                    <Typography variant="body2" color="#1565c0" sx={{ mb: 1 }}>
                      Preço: R$ {prod.price.toFixed(2).replace(".", ",")}
                    </Typography>
                    <Typography variant="body2" color="#1565c0" sx={{ mb: 1 }}>
                      PIX: R$ {prod.pricePix.toFixed(2).replace(".", ",")}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "space-between" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => addToCart({ ...prod, quantity: 1 })}
                    >
                      Adicionar ao Carrinho
                    </Button>
                    <Box>
                      <IconButton color="warning" onClick={() => handleEdit(index)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton color="error" onClick={() => handleDelete(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardActions>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Container>
    </Box>
  );
}
