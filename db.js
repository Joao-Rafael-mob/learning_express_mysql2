import mysql from 'mysql2/promise';

let connection;

async function connectDB() {
    try {
        connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'teste',
            password: '2002'
        });
        console.log('Conexão estabelecida com sucesso!');
    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        throw err;
    }
    return connection;
}

async function closeDB(connection) {
    try {
        if (connection) {
            await connection.end;
            console.log('Conexão encerrada com sucesso!');
        }
    } catch (err) {
        console.error('Erro ao encerrar a conexão:', err.message);
    }
}

export{connectDB, closeDB};