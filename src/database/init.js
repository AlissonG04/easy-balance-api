const db = require("./db");

async function criarTabelas() {
  try {
    // Tabela de usuários
    await db.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) UNIQUE NOT NULL,
        senha TEXT NOT NULL,
        tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('admin', 'operador')),
        pa_numero VARCHAR(10),
        criado_em TIMESTAMP DEFAULT NOW()
      );
    `);

    // Tabela de pesagens
    await db.query(`
      CREATE TABLE IF NOT EXISTS pesagens (
        id SERIAL PRIMARY KEY,
        peso NUMERIC(10, 2) NOT NULL,
        balanca VARCHAR(20) NOT NULL,
        tipo VARCHAR(20),
        criado_em TIMESTAMP DEFAULT NOW()
      );
    `);

    // Tabela de logs de ações em usuários
    await db.query(`
      CREATE TABLE IF NOT EXISTS logs_usuarios (
        id SERIAL PRIMARY KEY,
        usuario_id INTEGER REFERENCES usuarios(id),
        acao VARCHAR(50),
        detalhes TEXT,
        criado_em TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log("Tabelas criadas com sucesso!");
    process.exit();
  } catch (error) {
    console.error("Erro ao criar as tabelas:", error);
    process.exit(1);
  }
}

criarTabelas();
