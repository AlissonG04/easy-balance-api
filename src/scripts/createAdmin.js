const bcrypt = require("bcryptjs");
const pool = require("../config/db");

async function createAdmin() {
  const username = "admin";
  const password = "12345";
  const role = "admin";

  const passwordHash = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO users (username, password_hash, role)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const { rows } = await pool.query(query, [username, passwordHash, role]);
  console.log("Usuário admin criado:", rows[0]);
  process.exit();
}

createAdmin();
