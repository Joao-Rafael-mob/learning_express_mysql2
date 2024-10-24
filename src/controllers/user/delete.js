import { connectDB, closeDB } from "../../config/database.js";

async function DELETE(req, res) {
  const { id } = req.params;
  const sql = `DELETE FROM users WHERE id = ?`;
  let connection;

  try {
    connection = await connectDB();
    const [result] = await connection.query(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (err) {
    console.error("Erro ao deletar dados:", err);
    return res.status(500).json({ error: "Erro ao deletar pessoa" });
  } finally {
    await closeDB(connection);
  }
}
export { DELETE };
