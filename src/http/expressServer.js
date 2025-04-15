const express = require("express");
const session = require("express-session");
const authRoutes = require("./routes/auth");
const usuariosRoutes = require("./routes/usuarios");

const app = express();
app.use(express.json());

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
