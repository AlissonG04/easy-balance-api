const express = require("express");
const router = express.Router();
const db = require("../../database/db");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
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

    // Salvando dados do usuário na sessão
    req.session.usuario = {
      id: usuario.id,
      nome: usuario.nome,
      tipo: usuario.tipo,
    };

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

// Rota para logout (opcional)
router.post("/logout", (req, res) => {
  req.session.destroy();
  res.json({ success: true, message: "Sessão finalizada com sucesso." });
});

// Verificar sessão atual
router.get("/me", async (req, res) => {
  const usuarioSessao = req.session?.usuario;

  if (!usuarioSessao) {
    return res.status(401).json({ message: "Não autenticado" });
  }

  try {
    // Buscar no banco para pegar o pa_numero, se necessário
    const result = await db.query(
      "SELECT nome, tipo, pa_numero FROM usuarios WHERE id = $1",
      [usuarioSessao.id]
    );
    const usuario = result.rows[0];

    res.json({
      id: usuarioSessao.id,
      nome: usuario.nome,
      tipo: usuario.tipo,
      pa_numero: usuario.tipo === "operador" ? usuario.pa_numero : null,
    });
  } catch (err) {
    res.status(500).json({ message: "Erro ao buscar dados do usuário" });
  }
});

module.exports = router;
