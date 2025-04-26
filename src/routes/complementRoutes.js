const express = require("express");
const ComplementController = require("../controllers/complementController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Todas essas rotas precisam de autenticação
router.post("/", authMiddleware, ComplementController.create);
router.get("/pending", authMiddleware, ComplementController.listPending);

module.exports = router;
