const ComplementModel = require("../models/complementModel");

const ComplementController = {
  async create(req, res) {
    const { balanceId, plate, tara, liquid } = req.body;
    const requestedBy = req.user.id; // vem do middleware de autenticação

    if (!balanceId || !plate || !tara || !liquid) {
      return res.status(400).json({ message: "Campos obrigatórios ausentes." });
    }

    try {
      const complement = await ComplementModel.createComplement({
        balanceId,
        requestedBy,
        plate,
        tara,
        liquid,
      });

      const io = req.app.get("io");
      io.emit("new-complement", complement);

      res.status(201).json(complement);
    } catch (error) {
      console.error("ERRO DETALHADO:", error);
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  },

  async listPending(req, res) {
    try {
      const complements = await ComplementModel.getPendingComplements();
      res.json(complements);
    } catch (error) {
      console.error("Erro ao listar complementos pendentes:", error);
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  },
};

module.exports = ComplementController;
