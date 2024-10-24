import { connectDB, closeDB } from "../../config/database.js";
import bcrypt from "bcrypt";

async function POST(req, res) {
  const { firstname, surname, email, password } = req.body;
  const sql = `INSERT INTO users (firstname, surname, email, password) VALUES (?, ?, ?,?)`;
  let connection;

  try {
    const hashSenha = await bcrypt.hash(password, 10);
    connection = await connectDB();
    const [result] = await connection.query(sql, [
      firstname,
      surname,
      email,
      hashSenha
    ]);

    res.status(201).json({
      message: "Cadastro realizado com sucesso",
      id: result.insertId
    });
  } catch (err) {
    console.error("Erro ao inserir dados:", err);
    return res.status(500).json({ error: "Erro ao cadastrar pessoa" });
  } finally {
    await closeDB(connection);
  }
}
export { POST };
