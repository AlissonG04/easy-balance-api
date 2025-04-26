const express = require("express");
const AuthController = require("../controllers/authController"); // <- Importação correta!

const router = express.Router();

router.post("/login", AuthController.login); // <- Aqui precisa ser uma função!

module.exports = router;
