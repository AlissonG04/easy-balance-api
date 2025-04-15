const db = require("./database/db");

async function testarConexao() {
  try {
    const res = await db.query("SELECT NOW()");
    console.log("Horário do servidor:", res.rows[0]);
    process.exit();
  } catch (err) {
    console.error("Erro ao conectar no banco:", err);
    process.exit(1);
  }
}

testarConexao();
