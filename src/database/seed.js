const db = require("./db");
const bcrypt = require("bcrypt");

async function inserirUsuariosIniciais() {
  try {
    const senhaAdminCripto = await bcrypt.hash("123456", 10);
    const senhaOperadorCripto = await bcrypt.hash("123456", 10);

    await db.query(
      `
      INSERT INTO usuarios (nome, senha, tipo)
      VALUES ($1, $2, $3)
      ON CONFLICT (nome) DO NOTHING
    `,
      ["admin", senhaAdminCripto, "admin"]
    );

    await db.query(
      `
      INSERT INTO usuarios (nome, senha, tipo, pa_numero)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (nome) DO NOTHING
    `,
      ["operador1", senhaOperadorCripto, "operador", "PA-02"]
    );

    console.log("✅ Usuários inseridos com senha criptografada.");
    process.exit();
  } catch (err) {
    console.error("❌ Erro ao inserir usuários:", err);
    process.exit(1);
  }
}

inserirUsuariosIniciais();
