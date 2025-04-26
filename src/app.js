const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const authRoutes = require("./routes/authRoutes");
const complementRoutes = require("./routes/complementRoutes");

const userRoutes = require("./routes/userRoutes");
const balanceRoutes = require("./routes/balanceRoutes");

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/complements", complementRoutes);
app.use("/api/users", userRoutes);
app.use("/api/balances", balanceRoutes);

app.get("/", (req, res) => {
  res.send("Easy Balance API funcionando");
});

module.exports = app;
