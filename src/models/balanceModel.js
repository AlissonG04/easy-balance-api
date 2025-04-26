const pool = require("../config/db");

const BalanceModel = {
  async findAll() {
    const query = `
      SELECT id, name, ip_address, port, created_at
      FROM balances
      ORDER BY id ASC
    `;
    const { rows } = await pool.query(query);
    return rows;
  },

  async updateBalance(id, ipAddress, port) {
    const query = `
      UPDATE balances
      SET ip_address = $1,
          port = $2,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $3
      RETURNING id, name, ip_address, port, created_at
    `;
    const { rows } = await pool.query(query, [ipAddress, port, id]);
    return rows[0];
  },
};

module.exports = BalanceModel;
