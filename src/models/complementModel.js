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

  async updateComplementStatus(id, status, respondedBy, brutoDesejado = null) {
    let query;
    let values;

    if (status === "aceito" && brutoDesejado !== null) {
      query = `
        UPDATE complement_requests
        SET status = $1, responded_by = $2, bruto_desejado = $3, accepted_at = NOW()
        WHERE id = $4
        RETURNING *
      `;
      values = [status, respondedBy, brutoDesejado, id];
    } else {
      query = `
        UPDATE complement_requests
        SET status = $1, responded_by = $2
        WHERE id = $3
        RETURNING *
      `;
      values = [status, respondedBy, id];
    }

    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  async findById(id) {
    const query = "SELECT * FROM complement_requests WHERE id = $1";
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  },

  async completeComplement(id, grossFinal) {
    const query = `
      UPDATE complement_requests
      SET status = 'concluido',
          gross_final = $1,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = $2
      RETURNING *
    `;
    const values = [grossFinal, id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },
  //Buscar todos os complementos
  async getAllComplements() {
    const { rows } = await pool.query(
      "SELECT * FROM complement_requests ORDER BY created_at DESC"
    );
    return rows;
  },
};

module.exports = ComplementModel;
