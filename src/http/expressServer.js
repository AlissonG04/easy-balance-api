const express = require("express");
const session = require("express-session");
const authRoutes = require("./routes/auth");
const usuariosRoutes = require("./routes/usuarios");
const cors = require("cors");

const app = express();
app.use(express.json());

//Cors
app.use(
  cors({
    origin: "http://localhost:5173", // ou use "*" para liberar geral (não recomendado em produção)
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "easy_balance_super_secreto",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // colocar true se for HTTPS
  })
);

// Rotas
app.use("/api/login", authRoutes);
app.use("/api/usuarios", usuariosRoutes);

module.exports = app;
