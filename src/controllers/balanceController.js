const BalanceModel = require("../models/balanceModel");

const BalanceController = {
  async list(req, res) {
    try {
      const balances = await BalanceModel.findAll();
      res.json(balances);
    } catch (error) {
      console.error("Erro ao listar balanças:", error);
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  },

  async update(req, res) {
    const { id } = req.params;
    const { ip_address, port } = req.body;

    if (!ip_address || !port) {
      return res.status(400).json({ message: "Campos obrigatórios ausentes." });
    }

    try {
      const updated = await BalanceModel.updateBalance(id, ip_address, port);
      res.json(updated);
    } catch (error) {
      console.error("Erro ao atualizar balança:", error);
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  },
};

module.exports = BalanceController;
