const pool = require("../config/db");

const UserModel = {
  async findByUsername(username) {
    const query = "SELECT * FROM users WHERE username = $1";
    const { rows } = await pool.query(query, [username]);
    return rows[0];
  },

  async createUser(username, passwordHash, role) {
    const query = `
      INSERT INTO users (username, password_hash, role)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const { rows } = await pool.query(query, [username, passwordHash, role]);
    return rows[0];
  },
};

module.exports = UserModel;
