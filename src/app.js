const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middlewares principais
app.use(cors());
app.use(express.json()); // Body parser para JSON

// Rotas
app.get("/", (req, res) => {
  res.send("Easy Balance API funcionando");
});

module.exports = app;
