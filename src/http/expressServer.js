const express = require("express");
const session = require("express-session");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();
app.use(express.json());

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
