// src/pages/ProductsPage.jsx
import React, { useEffect, useState } from "react";
import Product from "../components/Product";
import { Box, Grid, Typography } from "@mui/material";

export default function ProductsPage({ onAddToCart }) {
  const [products, setProducts] = useState([]);
  const category = "smartphones";  // mudou para smartphones
  const limit = 20;
  const apiUrl = `https://dummyjson.com/products/category/${category}?limit=${limit}`;

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        const applePhones = data.products.filter(
          p => p.brand && p.brand.toLowerCase() === "apple"
        );
        setProducts(applePhones);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Celulares Apple
      </Typography>
      <Grid container spacing={2}>
        {products.length === 0 ? (
          <Typography>Nenhum celular Apple encontrado.</Typography>
        ) : (
          products.map(prod => (
            <Grid item xs={12} sm={6} md={4} key={prod.id}>
              <Product product={prod} onAddToCart={onAddToCart} />
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
}
