const express = require("express");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const complementRoutes = require("./routes/complementRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/auth", authRoutes);
app.use("/api/complements", complementRoutes);

app.get("/", (req, res) => {
  res.send("Easy Balance API funcionando");
});

module.exports = app;
