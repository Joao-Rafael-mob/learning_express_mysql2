import mysql from 'mysql2/promise';

async function connectDB() {
    try {
       const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'teste',
            password: '1234'
        });
        console.log('Conexão estabelecida com sucesso!');
        return connection;

    } catch (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        throw err;
    }
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
// (async ()=>{
//    let a = await connectDB();
//    closeDB(a);
// })()
export{connectDB, closeDB};