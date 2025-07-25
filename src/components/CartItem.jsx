import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CartItem({ product, onRemove }) {
  return (
    <Card sx={{ display: "flex", mb: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 160, objectFit: "contain", p: 1 }}
        image={product.thumbnail}
        alt={product.title}
      />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <CardContent>
          <Typography variant="subtitle2" color="primary">
            {product.brand}
          </Typography>
          <Typography fontWeight="bold">{product.title}</Typography>
          <Typography>
            PIX: R$ {product.pricePix.toFixed(2).replace(".", ",")}
          </Typography>
          <Typography>
            Cartão: R$ {product.pricePrazo.toFixed(2).replace(".", ",")}
          </Typography>
          <Typography>Qtd: {product.quantity}</Typography>
        </CardContent>
        <Box sx={{ ml: "auto", pb: 1 }}>
          <IconButton color="error" onClick={onRemove}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
}
