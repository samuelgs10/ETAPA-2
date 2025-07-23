import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import { AppBar, Toolbar, Typography, Button, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function App() {
  const [cart, setCart] = useState([]);

  // Função para adicionar ao carrinho, passada para ProductsPage
  const handleAddToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Minha Loja
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Produtos
          </Button>
          <Button color="inherit" component={Link} to="/cart">
            <Badge badgeContent={cart.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </Button>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route 
          path="/" 
          element={<ProductsPage onAddToCart={handleAddToCart} />} 
        />
        <Route 
          path="/cart" 
          element={<CartPage cart={cart} />} 
        />
      </Routes>
    </BrowserRouter>
  );
}
