import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { useCart } from "../contexts/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
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
        image={product.thumbnail}
        alt={product.title}
        sx={{
          objectFit: "contain",
          bgcolor: "#e3f2fd",
          p: 1,
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          gutterBottom
          color="#1976d2"
        >
          {product.title.length > 60
            ? product.title.slice(0, 60) + "..."
            : product.title}
        </Typography>
        <Typography variant="body2" color="#1565c0" sx={{ mb: 1 }}>
          Preço: R$ {product.price.toFixed(2).replace(".", ",")}
        </Typography>
        <Typography variant="body2" color="#1565c0" sx={{ mb: 1 }}>
          PIX: R$ {product.pricePix.toFixed(2).replace(".", ",")}
        </Typography>
      </CardContent>
      <Button
        variant="contained"
        color="primary"
        onClick={() => addToCart({ ...product, quantity: 1 })}
        sx={{
          m: 1,
          bgcolor: "#1976d2",
          "&:hover": { bgcolor: "#0d47a1" },
        }}
      >
        Adicionar ao Carrinho
      </Button>
    </Card>
  );
}
