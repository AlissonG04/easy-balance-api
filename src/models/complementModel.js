const pool = require("../config/db");

const ComplementModel = {
  async createComplement({ balanceId, requestedBy, plate, tara, liquid }) {
    const query = `
      INSERT INTO complement_requests (balance_id, requested_by, plate, tara, liquid, status)
      VALUES ($1, $2, $3, $4, $5, 'pendente')
      RETURNING *
    `;
    const values = [balanceId, requestedBy, plate, tara, liquid];

    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async getPendingComplements() {
    const query = `
      SELECT * FROM complement_requests
      WHERE status = 'pendente'
      ORDER BY created_at ASC
    `;
    const { rows } = await pool.query(query);
    return rows;
  },
};

module.exports = ComplementModel;
