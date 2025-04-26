const ComplementModel = require("../models/complementModel");

const ComplementController = {
  async create(req, res) {
    const { balanceId, plate, tara, liquid } = req.body;
    const requestedBy = req.user.id;

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

  async accept(req, res) {
    const { id } = req.params;
    const respondedBy = req.user.id;

    try {
      const complement = await ComplementModel.findById(id);

      if (!complement) {
        return res
          .status(404)
          .json({ message: "Solicitação de complemento não encontrada." });
      }

      if (complement.status !== "pendente") {
        return res
          .status(400)
          .json({ message: "Solicitação já foi processada." });
      }

      const updated = await ComplementModel.updateComplementStatus(
        id,
        "aceito",
        respondedBy
      );

      const io = req.app.get("io");
      io.emit("complement-accepted", updated);

      res.json(updated);
    } catch (error) {
      console.error("Erro ao aceitar complemento:", error);
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  },

  async reject(req, res) {
    const { id } = req.params;
    const respondedBy = req.user.id;

    try {
      const complement = await ComplementModel.findById(id);

      if (!complement) {
        return res
          .status(404)
          .json({ message: "Solicitação de complemento não encontrada." });
      }

      if (complement.status !== "pendente") {
        return res
          .status(400)
          .json({ message: "Solicitação já foi processada." });
      }

      const updated = await ComplementModel.updateComplementStatus(
        id,
        "rejeitado",
        respondedBy
      );

      const io = req.app.get("io");
      io.emit("complement-rejected", updated);

      res.json(updated);
    } catch (error) {
      console.error("Erro ao rejeitar complemento:", error);
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  },

  async complete(req, res) {
    const { id } = req.params;
    const { grossFinal } = req.body;

    try {
      const complement = await ComplementModel.findById(id);

      if (!complement) {
        return res
          .status(404)
          .json({ message: "Solicitação de complemento não encontrada." });
      }

      if (complement.status !== "aceito") {
        return res
          .status(400)
          .json({ message: "Só é possível finalizar complementos aceitos." });
      }

      const updated = await ComplementModel.completeComplement(id, grossFinal);

      const io = req.app.get("io");
      io.emit("complement-completed", updated);

      res.json(updated);
    } catch (error) {
      console.error("Erro ao finalizar complemento:", error);
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  },
};

module.exports = ComplementController;
