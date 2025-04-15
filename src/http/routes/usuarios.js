const express = require("express");
const router = express.Router();
const db = require("../../database/db");
const bcrypt = require("bcrypt");
const adminOnly = require("../../auth/adminOnly");

// Middleware aplicado a todas as rotas abaixo
router.use(adminOnly);

// Listar usuários
router.get("/", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT id, nome, tipo, pa_numero, criado_em
      FROM usuarios
      ORDER BY id ASC
    `);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Erro ao listar usuários" });
  }
});

// Criar novo usuário
router.post("/", async (req, res) => {
  const { nome, senha, tipo, pa_numero } = req.body;
  const criadorId = req.session.usuario.id;

  if (!nome || !senha || !tipo) {
    return res
      .status(400)
      .json({ message: "Campos obrigatórios não preenchidos" });
  }

  try {
    const senhaHash = await bcrypt.hash(senha, 10);

    await db.query(
      `
      INSERT INTO usuarios (nome, senha, tipo, pa_numero)
      VALUES ($1, $2, $3, $4)
    `,
      [nome, senhaHash, tipo, tipo === "operador" ? pa_numero : null]
    );

    await db.query(
      `
      INSERT INTO logs_usuarios (usuario_id, acao, detalhes)
      VALUES ($1, 'criar', $2)
    `,
      [criadorId, `Criou usuário ${nome} (${tipo})`]
    );

    res.status(201).json({ message: "Usuário criado com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao criar usuário" });
  }
});

// Editar usuário
router.put("/:id", async (req, res) => {
  const { nome, senha, tipo, pa_numero } = req.body;
  const { id } = req.params;
  const editorId = req.session.usuario.id;

  try {
    const senhaHash = senha ? await bcrypt.hash(senha, 10) : null;

    await db.query(
      `
      UPDATE usuarios SET
        nome = COALESCE($1, nome),
        senha = COALESCE($2, senha),
        tipo = COALESCE($3, tipo),
        pa_numero = COALESCE($4, pa_numero)
      WHERE id = $5
    `,
      [nome, senhaHash, tipo, tipo === "operador" ? pa_numero : null, id]
    );

    await db.query(
      `
      INSERT INTO logs_usuarios (usuario_id, acao, detalhes)
      VALUES ($1, 'editar', $2)
    `,
      [editorId, `Editou usuário ID ${id}`]
    );

    res.json({ message: "Usuário atualizado com sucesso" });
  } catch (err) {
    res.status(500).json({ message: "Erro ao editar usuário" });
  }
});

//Excluir Usuário
router.delete("/:id", adminOnly, async (req, res) => {
  const { id } = req.params;
  await db.query("DELETE FROM usuarios WHERE id = $1", [id]);
  res.json({ success: true, message: "Usuário excluído com sucesso." });
});

module.exports = router;
