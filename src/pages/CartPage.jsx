// src/pages/CartPage.jsx
import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  CardMedia,
  Button,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Paper,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function CartPage() {
  // Estado inicial com os produtos no carrinho
  const [products, setProducts] = useState([
    {
      id: 2,
      title: "Celular Apple iPhone 14 Pro",
      brand: "Apple",
      thumbnail:
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-14-pro-model-unselect-gallery-1-202209?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1660753619946",
      price: 8999.0,
      pricePix: 8499.0,
      quantity: 2,
    },
    {
      id: 4,
      title: "Celular Apple iPhone SE",
      brand: "Apple",
      thumbnail:
        "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-se-black-select-2022?wid=470&hei=556&fmt=png-alpha&.v=1645036275532",
      price: 3299.0,
      pricePix: 2999.0,
      quantity: 1,
    },
    {
      id: 3,
      title: "Headset Gamer HyperX Cloud II",
      brand: "HyperX",
      thumbnail:
        "https://hyperx-cdn.hyperxgaming.com/hyperx-cloud-ii-gaming-headset.png",
      price: 699.9,
      pricePix: 629.9,
      quantity: 1,
    },
  ]);

  // Filtra só celulares Apple
  const filteredProducts = products.filter((p) => p.brand === "Apple");

  // Remove produto pelo id
  function handleRemove(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  // Calcula total só dos celulares Apple
  const totalPrice = filteredProducts.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  );
  const totalPricePix = filteredProducts.reduce(
    (acc, p) => acc + p.pricePix * p.quantity,
    0
  );
  const economia = totalPrice - totalPricePix;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h5" gutterBottom>
        Carrinho - Celulares Apple
      </Typography>
      <Grid container spacing={3}>
        {/* Lado Esquerdo */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Typography variant="h6">Produto e Serviço</Typography>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setProducts([])}
              >
                Remover todos os produtos
              </Button>
            </Box>

            {filteredProducts.length === 0 && (
              <Typography>Nenhum celular Apple no carrinho.</Typography>
            )}

            {/* Lista dos celulares Apple */}
            {filteredProducts.map((product) => (
              <Box
                key={product.id}
                display="flex"
                gap={2}
                mb={3}
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 2,
                  p: 2,
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {/* Botão X para remover */}
                <IconButton
                  aria-label="remover"
                  size="small"
                  sx={{ position: "absolute", top: 8, right: 8 }}
                  onClick={() => handleRemove(product.id)}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>

                <CardMedia
                  component="img"
                  image={product.thumbnail}
                  alt={product.title}
                  sx={{ width: 160, height: 160, objectFit: "cover", borderRadius: 2 }}
                />

                <Box flex={1}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {product.brand}
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {product.title}
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Com desconto no PIX:{" "}
                    <strong>R$ {product.pricePix.toFixed(2)}</strong>
                    <br />
                    Parcelado no cartão sem juros: R$ {product.price.toFixed(2)}
                  </Typography>

                  <Box display="flex" alignItems="center" mt={2} gap={2}>
                    <Typography>Quant.</Typography>
                    <Typography>{product.quantity}</Typography>
                  </Box>
                </Box>

                <Box>
                  <Typography sx={{ color: "green", fontWeight: "bold" }}>
                    R$ {(product.pricePix * product.quantity).toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            ))}

            {/* Serviços */}
            <Divider sx={{ my: 3 }} />
            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Garantia Estendida Original Ampliada
              </Typography>
              <FormControl>
                <RadioGroup defaultValue="sem" name="garantia">
                  <FormControlLabel
                    value="sem"
                    control={<Radio />}
                    label="Sem garantia"
                  />
                  <FormControlLabel
                    value="12"
                    control={<Radio />}
                    label="12 meses - até 10x R$ 38,31"
                  />
                  <FormControlLabel
                    value="24"
                    control={<Radio />}
                    label="24 meses - até 10x R$ 51,83"
                  />
                </RadioGroup>
              </FormControl>
              <Typography variant="caption" color="text.secondary">
                Ao adicionar a Garantia Estendida Original Ampliada, declaro que li
                e aceito os termos.
              </Typography>

              <Box mt={2}>
                <Typography fontWeight="bold">Subtotal serviços: R$ 0,00</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Lado Direito: Resumo */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Resumo
            </Typography>
            <Box display="flex" justifyContent="space-between">
              <Typography>Valor dos Produtos:</Typography>
              <Typography>R$ {totalPrice.toFixed(2)}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography>Total a prazo:</Typography>
              <Typography>R$ {totalPrice.toFixed(2)}</Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              bgcolor="#d4fadd"
              p={1}
              mt={1}
              borderRadius={1}
            >
              <Typography>Valor à vista no PIX:</Typography>
              <Typography sx={{ color: "green", fontWeight: "bold" }}>
                R$ {totalPricePix.toFixed(2)}
              </Typography>
            </Box>
            <Typography variant="caption" color="gray">
              (Economize: R$ {economia.toFixed(2)})
            </Typography>

            <Box mt={3}>
              <Button fullWidth variant="contained" color="warning" sx={{ mb: 1 }}>
                Continuar
              </Button>
              <Button fullWidth variant="outlined" color="warning">
                Voltar
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
