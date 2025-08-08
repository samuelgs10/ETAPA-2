import React, { useState, useContext } from "react";
import { Box, Button, TextField, Typography, Link as MuiLink } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  // Pega a função login do contexto
  const { login } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    const nome = email.split("@")[0];

    // Atualiza o estado global via contexto (e localStorage dentro do contexto)
    login(nome);

    // Navega para a home assim que o estado mudar
    navigate("/");
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#e3f2fd",
      }}
    >
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: 300,
        }}
      >
        <Typography variant="h5" mb={2} color="primary" fontWeight="bold">
          Login
        </Typography>
        <TextField
          label="E-mail"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Entrar
        </Button>
        <Typography variant="body2" mt={2}>
          Não tem conta?{" "}
          <MuiLink component={Link} to="/cadastro">
            Cadastre-se
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
}
