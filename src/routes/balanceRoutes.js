const express = require("express");
const BalanceController = require("../controllers/balanceController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

// Apenas admin pode atualizar
router.get("/", authMiddleware, BalanceController.list);
router.put("/:id", authMiddleware, adminMiddleware, BalanceController.update);

module.exports = router;
