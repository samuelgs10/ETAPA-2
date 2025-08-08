// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  // Carrega o usuário do localStorage quando o app inicia
  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUsuario(storedUser);
    }
  }, []);

  // Função para login: salva no localStorage e atualiza estado
  const login = (nome) => {
    localStorage.setItem("usuario", nome);
    setUsuario(nome);
  };

  // Função para logout: remove do localStorage e limpa estado
  const logout = () => {
    localStorage.removeItem("usuario");
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
