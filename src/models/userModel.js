const pool = require("../config/db");

const UserModel = {
  async findByUsername(username) {
    const query = "SELECT * FROM users WHERE username = $1";
    const { rows } = await pool.query(query, [username]);
    return rows[0];
  },

  async findById(id) {
    const query = "SELECT * FROM users WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  async findAll() {
    const query =
      "SELECT id, username, role, created_at FROM users ORDER BY id ASC";
    const { rows } = await pool.query(query);
    return rows;
  },

  async createUser(username, passwordHash, role) {
    const query = `
      INSERT INTO users (username, password_hash, role)
      VALUES ($1, $2, $3)
      RETURNING id, username, role, created_at
    `;
    const { rows } = await pool.query(query, [username, passwordHash, role]);
    return rows[0];
  },

  async updateUser(id, username, role) {
    const query = `
      UPDATE users
      SET username = $1,
          role = $2,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING id, username, role, created_at
    `;
    const { rows } = await pool.query(query, [username, role, id]);
    return rows[0];
  },

  async deleteUser(id) {
    const query = "DELETE FROM users WHERE id = $1";
    await pool.query(query, [id]);
    return true;
  },
};

module.exports = UserModel;
