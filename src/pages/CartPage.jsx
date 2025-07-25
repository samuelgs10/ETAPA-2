// src/pages/CartPage.jsx
import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Collapse,
  Badge,
  AppBar,
  Toolbar,
  Link as MuiLink,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

const garantiaValores = { sem: 0, "12meses": 200, "24meses": 350 };

function CartItem({ product, onRemove }) {
  return (
    <Card
      sx={{
        display: "flex",
        mb: 2,
        borderRadius: 2,
        boxShadow: 3,
        border: "1px solid #90caf9",
        "&:hover": { boxShadow: 6, transform: "scale(1.02)" },
        transition: "all 0.2s ease-in-out",
      }}
      elevation={0}
    >
      <CardMedia
        component="img"
        sx={{ width: 140, objectFit: "contain", p: 1, bgcolor: "#e3f2fd" }}
        image={product.thumbnail}
        alt={product.title}
      />
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", p: 2 }}>
        <CardContent sx={{ flexGrow: 1, pb: 0 }}>
          <Typography variant="caption" color="#1976d2" fontWeight="bold">
            {product.brand}
          </Typography>
          <Typography fontWeight="bold" mt={0.5} color="#0d47a1">
            {product.title}
          </Typography>
          <Box sx={{ mt: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography fontWeight="bold" color="#d32f2f">
              R$ {product.pricePix.toFixed(2).replace(".", ",")}
            </Typography>
            <Typography variant="caption" color="text.secondary" fontSize={12}>
              À vista no PIX
            </Typography>
          </Box>
          <Typography variant="caption" mt={0.5}>
            Quantidade: {product.quantity}
          </Typography>
        </CardContent>
        <Box sx={{ ml: "auto", pt: 1 }}>
          <Button
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => onRemove(product.id)}
            sx={{ fontWeight: "bold" }}
          >
            REMOVER
          </Button>
        </Box>
      </Box>
    </Card>
  );
}

function GarantiaSelector({ garantia, setGarantia }) {
  const [open, setOpen] = useState(true);

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 2,
        bgcolor: "#f5f9ff",
        borderColor: "#90caf9",
        cursor: "pointer",
        userSelect: "none",
      }}
      onClick={() => setOpen(!open)}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography fontWeight="bold" color="#1976d2">
          GARANTIA ESTENDIDA ORIGINAL AMPLIADA
        </Typography>
        <Typography fontWeight="bold" fontSize="1.4rem" color="#1976d2" userSelect="none">
          {open ? "▲" : "▼"}
        </Typography>
      </Box>

      <Collapse in={open}>
        <RadioGroup value={garantia} onChange={(e) => setGarantia(e.target.value)} sx={{ mt: 2 }}>
          <FormControlLabel
            value="sem"
            control={<Radio />}
            label={
              <Box>
                Sem garantia
                <Typography component="span" variant="caption" ml={2} color="text.secondary" fontWeight="normal">
                  Até 10x sem juros de R$ 0,00
                </Typography>
              </Box>
            }
          />
          <FormControlLabel
            value="12meses"
            control={<Radio />}
            label={
              <Box>
                12 Meses de Garantia Estendida Kabum
                <Typography component="span" variant="caption" ml={2} color="text.secondary" fontWeight="normal">
                  Até 10x sem juros de R$ 38,31
                </Typography>
              </Box>
            }
          />
          <FormControlLabel
            value="24meses"
            control={<Radio />}
            label={
              <Box>
                24 Meses de Garantia Estendida Kabum
                <Typography component="span" variant="caption" ml={2} color="text.secondary" fontWeight="normal">
                  Até 10x sem juros de R$ 51,83
                </Typography>
              </Box>
            }
          />
        </RadioGroup>
        <Typography variant="caption" color="text.secondary" mt={1} display="block">
          Ao adicionar a{" "}
          <MuiLink href="#" underline="hover" fontWeight="bold" color="#1976d2">
            Garantia Estendida Original Ampliada
          </MuiLink>
          , declaro que li e aceito as Condições gerais
        </Typography>
      </Collapse>
    </Paper>
  );
}

function ResumoPedido({ cart, garantia, paymentMethod, setPaymentMethod, onSubmit }) {
  const totalProdutos = cart.reduce((acc, p) => acc + (p.pricePrazo ?? p.price) * p.quantity, 0);
  const totalGarantia = garantiaValores[garantia] * cart.reduce((acc, p) => acc + p.quantity, 0);
  const totalPrazo = totalProdutos + totalGarantia;
  const totalPix = totalPrazo * 0.9;
  const parcelas = 10;
  const valorParcela = totalPrazo / parcelas;

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 2,
        border: "1px solid #90caf9",
        bgcolor: "#f5f9ff",
      }}
      elevation={0}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ borderBottom: "1px solid #90caf9", pb: 1, color: "#1976d2" }}>
        RESUMO
      </Typography>

      <Box mb={2}>
        <Typography display="flex" justifyContent="space-between" color="#1976d2">
          <span>Valor dos Produtos:</span>
          <span>R$ {totalProdutos.toFixed(2).replace(".", ",")}</span>
        </Typography>
        <Typography display="flex" justifyContent="space-between" color="#1976d2">
          <span>Garantia:</span>
          <span>R$ {totalGarantia.toFixed(2).replace(".", ",")}</span>
        </Typography>
        <Typography display="flex" justifyContent="space-between" fontWeight="bold" color="#0d47a1">
          <span>Total a prazo:</span>
          <span>
            R$ {totalPrazo.toFixed(2).replace(".", ",")}{" "}
            <Typography component="span" variant="caption" fontWeight="normal" color="#1976d2">
              (em até {parcelas}x de R$ {valorParcela.toFixed(2).replace(".", ",")} sem juros)
            </Typography>
          </span>
        </Typography>
      </Box>

      <Box
        sx={{
          bgcolor: "#d0e8ff",
          p: 1.5,
          borderRadius: 1,
          mb: 3,
          border: "1px solid #90caf9",
        }}
      >
        <Typography display="flex" justifyContent="space-between" fontWeight="bold" color="#1976d2">
          <span>Valor à vista no PIX:</span>
          <span>R$ {totalPix.toFixed(2).replace(".", ",")}</span>
        </Typography>
        <Typography color="#1565c0" fontSize={12} fontWeight="bold">
          (Economize: R$ {(totalPrazo - totalPix).toFixed(2).replace(".", ",")})
        </Typography>
      </Box>

      <Box component="form" onSubmit={onSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Nome completo" fullWidth required />
        <TextField label="CPF" fullWidth required />
        <TextField label="Endereço" fullWidth required />
        <FormControl fullWidth required>
          <InputLabel>Forma de pagamento</InputLabel>
          <Select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} label="Forma de pagamento">
            <MenuItem value="credito">Cartão de Crédito</MenuItem>
            <MenuItem value="debito">Cartão de Débito</MenuItem>
            <MenuItem value="pix">Pix</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ bgcolor: "#1976d2", "&:hover": { bgcolor: "#0d47a1" }, fontWeight: "bold" }}
        >
          CONTINUAR
        </Button>
        <Button
          variant="outlined"
          fullWidth
          component={Link}
          to="/produtos"
          sx={{
            color: "#1976d2",
            borderColor: "#1976d2",
            "&:hover": { borderColor: "#0d47a1", color: "#0d47a1" },
            fontWeight: "bold",
          }}
        >
          VOLTAR
        </Button>
      </Box>
    </Paper>
  );
}

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [garantia, setGarantia] = useState("sem");

  const handleFinalizarPedido = (e) => {
    e.preventDefault();
    if (!paymentMethod) {
      alert("Escolha uma forma de pagamento");
      return;
    }
    alert("Pedido realizado!");
    clearCart();
    navigate("/pedido-confirmado");
  };

  return (
    <Box sx={{ bgcolor: "#f5faff", minHeight: "100vh", pb: 6 }}>
      <AppBar position="fixed" sx={{ bgcolor: "#1565c0", zIndex: (theme) => theme.zIndex.drawer + 1 }}>
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

          <Typography variant="h6" sx={{ fontWeight: "bold", color: "white", flexGrow: 1, textAlign: "center" }}>
            Tech Store
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <IconButton component={Link} to="/carrinho" sx={{ color: "white" }}>
              <Badge badgeContent={cartItems.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <Typography variant="caption" sx={{ color: "white", fontWeight: "bold", mt: 0.5 }}>
              {cartItems.length > 0
                ? `R$ ${cartItems
                    .reduce((sum, item) => sum + item.pricePix * item.quantity, 0)
                    .toFixed(2)
                    .replace(".", ",")}`
                : "Carrinho vazio"}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 12, px: { xs: 2, md: 6 } }}>
        <Typography variant="h5" fontWeight="bold" mb={4} color="#1976d2">
          Carrinho
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            {cartItems.length === 0 ? (
              <Typography>Nenhum produto no carrinho.</Typography>
            ) : (
              cartItems.map((p) => <CartItem key={p.id} product={p} onRemove={removeFromCart} />)
            )}
            <GarantiaSelector garantia={garantia} setGarantia={setGarantia} />
          </Grid>

          <Grid item xs={12} md={4}>
            <ResumoPedido
              cart={cartItems}
              garantia={garantia}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              onSubmit={handleFinalizarPedido}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
