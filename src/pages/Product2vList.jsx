// src/pages/Product2vList.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Container,
  IconButton,
} from "@mui/material";
import { useCart } from "../contexts/CartContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Product2vList() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  // Campos para CRUD manual
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from("product_2v").select("*");
      if (error) {
        console.error("Erro ao buscar produtos:", error.message);
      } else {
        setProducts(data);
      }
    }
    fetchProducts();
  }, []);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome || !preco || !thumbnail) return;

    if (editIndex !== null) {
      const novos = [...products];
      novos[editIndex] = {
        nome,
        price: parseFloat(preco),
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
          thumbnail,
        },
      ]);
    }

    setNome("");
    setPreco("");
    setThumbnail("");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5faff", pt: 4 }}>
      <Container sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          gutterBottom
          color="#0d47a1"
          textAlign="center"
        >
          Produtos Product 2V
        </Typography>

        {/* Formulário CRUD */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
            mb: 4,
            bgcolor: "white",
            p: 2,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <input
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            style={{ padding: "6px 8px", borderRadius: 4, border: "1px solid #ccc" }}
          />
          <input
            placeholder="Preço"
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            required
            style={{ padding: "6px 8px", borderRadius: 4, border: "1px solid #ccc" }}
          />
          <input
            placeholder="URL da Imagem"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            required
            style={{ padding: "6px 8px", borderRadius: 4, border: "1px solid #ccc" }}
          />
          <Button type="submit" variant="contained" color="primary">
            {editIndex !== null ? "Atualizar" : "Adicionar"}
          </Button>
        </Box>

        {/* Grid de produtos */}
        <Grid container spacing={2}>
          {products.length === 0 ? (
            <Typography>Nenhum produto encontrado.</Typography>
          ) : (
            products.map((prod, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    boxShadow: 3,
                    borderRadius: 2,
                    border: "1px solid #90caf9",
                    "&:hover": { boxShadow: 6, transform: "scale(1.03)" },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  {prod.thumbnail && (
                    <CardMedia
                      component="img"
                      height="180"
                      image={prod.thumbnail}
                      alt={prod.title || prod.nome}
                      sx={{ objectFit: "contain", bgcolor: "#e3f2fd", p: 1 }}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      variant="subtitle1"
                      fontWeight="bold"
                      gutterBottom
                      color="#1976d2"
                    >
                      {prod.title || prod.nome}
                    </Typography>
                    <Typography variant="body2" color="#1565c0">
                      R$ {prod.price?.toFixed(2).replace(".", ",")}
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
