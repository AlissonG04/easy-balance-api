const express = require("express");
const ComplementController = require("../controllers/complementController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Todas as rotas protegidas
router.post("/", authMiddleware, ComplementController.create);
router.get("/pending", authMiddleware, ComplementController.listPending);
router.put("/:id/accept", authMiddleware, ComplementController.accept);
router.put("/:id/reject", authMiddleware, ComplementController.reject);

module.exports = router;
