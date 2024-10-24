import { connectDB, closeDB } from "../../config/database.js";

async function GETID(req, res) {
  const { id } = req.params;
  const sql = `SELECT * FROM users WHERE id = ?`;

  let connection;
  try {
    connection = await connectDB();
    const [result] = await connection.query(sql, [id]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json(result[0]);
  } catch (err) {
    console.error("Erro ao consultar dados:", err);
    return res.status(500).json({ error: "Erro ao consultar pessoa" });
  } finally {
    await closeDB(connection);
  }
}

export { GETID };
