// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import { api } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = async (username, password) => {
    try {
      const response = await api.post("/Auth/login", { username, password });
      const { token, role, username: userName } = response.data;
      setToken(token);
      setUser({ username: userName, role });
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("username", userName);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return true;
    } catch (error) {
      return false;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    delete api.defaults.headers.common["Authorization"];
  };

  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};