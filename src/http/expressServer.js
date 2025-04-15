const express = require("express");
const session = require("express-session");
const authRoutes = require("./routes/auth");
const usuariosRoutes = require("./routes/usuarios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/api/usuarios", usuariosRoutes);

// Sessão simples (opcional)
app.use(
  session({
    secret: process.env.SESSION_SECRET || "easy_balance_secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Rotas
app.use("/api", authRoutes);

module.exports = app;
