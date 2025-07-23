// src/components/Product.jsx
import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';

export default function Product({ product, onAddToCart }) {
  return (
    <Card sx={{ maxWidth: 345, margin: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="180"
        image={product.thumbnail}
        alt={product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ height: 60, overflow: 'hidden' }}>
          {product.description}
        </Typography>
        <Typography variant="h6" color="green" sx={{ mt: 1 }}>
          R$ {product.price.toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          variant="contained" 
          size="small" 
          fullWidth
          onClick={() => onAddToCart(product)}
        >
          Adicionar ao carrinho
        </Button>
      </CardActions>
    </Card>
  );
}
