const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

const AuthController = {
  async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await UserModel.findByUsername(username);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      const passwordMatch = await bcrypt.compare(password, user.password_hash);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Senha incorreta." });
      }

      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      return res.json({ token });
    } catch (error) {
      console.error("Erro no login:", error);
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  },
};

module.exports = AuthController; // <- ESSENCIAL! ✅
