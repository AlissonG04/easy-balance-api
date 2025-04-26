const express = require("express");
const UserController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

// Todas as rotas protegidas para admin
router.get("/", authMiddleware, adminMiddleware, UserController.listUsers);
router.post("/", authMiddleware, adminMiddleware, UserController.createUser);
router.put("/:id", authMiddleware, adminMiddleware, UserController.updateUser);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  UserController.deleteUser
);

module.exports = router;
