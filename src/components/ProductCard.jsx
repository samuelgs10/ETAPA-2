import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import { useCart } from "../contexts/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        transition: "transform 0.3s",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={product.thumbnail || "https://via.placeholder.com/180"}
        alt={product.title || "Produto"}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {product.title || "Título não disponível"}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {product.description || "Descrição indisponível."}
        </Typography>
        <Typography variant="h6" color="primary">
          {product.price !== undefined ? `R$ ${product.price.toFixed(2)}` : "Preço não disponível"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          fullWidth
          onClick={() => addToCart(product)}
        >
          Adicionar ao Carrinho
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
