const express = require("express");
const router = express.Router();
const db = require("../../database/db");
const bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  const { nome, senha } = req.body;

  if (!nome || !senha) {
    return res
      .status(400)
      .json({ success: false, message: "Nome e senha são obrigatórios." });
  }

  try {
    const result = await db.query("SELECT * FROM usuarios WHERE nome = $1", [
      nome,
    ]);
    const usuario = result.rows[0];

    if (!usuario) {
      return res
        .status(401)
        .json({ success: false, message: "Usuário não encontrado." });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res
        .status(401)
        .json({ success: false, message: "Senha incorreta." });
    }

    return res.json({
      success: true,
      tipo: usuario.tipo,
      pa_numero: usuario.tipo === "operador" ? usuario.pa_numero : null,
    });
  } catch (err) {
    console.error("Erro no login:", err);
    return res
      .status(500)
      .json({ success: false, message: "Erro interno do servidor." });
  }
});

module.exports = router;
