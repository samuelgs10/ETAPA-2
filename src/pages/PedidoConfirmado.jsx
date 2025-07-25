import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function PedidoConfirmado() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="80vh"
      textAlign="center"
      sx={{ p: 3, fontFamily: "Arial, sans-serif" }}
    >
      <Typography variant="h4" gutterBottom>
        ✅ Pedido Confirmado!
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Seu pedido foi realizado com sucesso. Em breve você receberá a confirmação por e-mail.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Voltar para a loja
      </Button>
    </Box>
  );
}
