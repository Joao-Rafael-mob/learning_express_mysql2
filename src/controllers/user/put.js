import { connectDB, closeDB } from "../../config/database.js";

async function PUT(req, res) {
  const { id, nome, idade, senha } = req.body;
  const sql = `UPDATE users SET nome = ?, idade = ?, senha = ? WHERE id = ?`;
  let connection;

  try {
    const hashSenha = await bcrypt.hash(senha, 10);
    connection = await connectDB();
    const [result] = await connection.query(sql, [nome, idade, hashSenha, id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json({ message: "Atualização realizada com sucesso" });
  } catch (err) {
    console.error("Erro ao atualizar dados:", err);
    return res.status(500).json({ error: "Erro ao atualizar pessoa" });
  } finally {
    await closeDB(connection);
  }
}
export { PUT };
