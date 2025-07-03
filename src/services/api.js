// src/services/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://localhost:7112/api",
});