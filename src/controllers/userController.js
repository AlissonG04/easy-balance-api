const bcrypt = require("bcryptjs");
const UserModel = require("../models/userModel");

const UserController = {
  async listUsers(req, res) {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  },

  async createUser(req, res) {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return res.status(400).json({ message: "Campos obrigatórios ausentes." });
    }

    try {
      const passwordHash = await bcrypt.hash(password, 10);
      const user = await UserModel.createUser(username, passwordHash, role);
      res.status(201).json(user);
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  },

  async updateUser(req, res) {
    const { id } = req.params;
    const { username, role } = req.body;

    if (!username || !role) {
      return res.status(400).json({ message: "Campos obrigatórios ausentes." });
    }

    try {
      const user = await UserModel.updateUser(id, username, role);
      res.json(user);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  },

  async deleteUser(req, res) {
    const { id } = req.params;

    try {
      await UserModel.deleteUser(id);
      res.json({ message: "Usuário excluído com sucesso." });
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  },
};

module.exports = UserController;
