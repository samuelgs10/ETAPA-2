import React, { useState, useContext } from "react";
import { Box, Button, TextField, Typography, Link as MuiLink } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function CadastroUsuarioPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleCadastro = (e) => {
    e.preventDefault();

    if (!nome || !email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    login(nome);

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
        onSubmit={handleCadastro}
        sx={{
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: 300,
        }}
      >
        <Typography variant="h5" mb={2} color="primary" fontWeight="bold">
          Cadastro
        </Typography>
        <TextField
          label="Nome"
          fullWidth
          margin="normal"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
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
          Cadastrar
        </Button>
        <Typography variant="body2" mt={2}>
          Já tem conta?{" "}
          <MuiLink component={Link} to="/login">
            Faça login
          </MuiLink>
        </Typography>
      </Box>
    </Box>
  );
}
