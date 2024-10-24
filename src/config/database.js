import mysql from "mysql2/promise";
import "dotenv/config";

async function connectDB() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      database: process.env.DATABASE,
      password: process.env.PASSWORD
    });
    console.log("Conexão estabelecida com sucesso!");
    return connection;
  } catch (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
    throw err;
  }
}

async function closeDB(connection) {
  try {
    if (connection) {
      await connection.end;
      console.log("Conexão encerrada com sucesso!");
    }
  } catch (err) {
    console.error("Erro ao encerrar a conexão:", err.message);
  }
}


export { connectDB, closeDB };
