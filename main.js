import express from 'express';
import { connectDB, closeDB } from './db.js';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/user', async (req, res) => {
    const { id } = req.query;
    const sql = `SELECT * FROM pessoas WHERE id = ?`;

    let connection;
    try {
        connection = await connectDB();
        const [result] = await connection.query(sql, [id]);

        if (result.length === 0) {
            await closeDB(connection);
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json(result[0]);
        await closeDB(connection);
    } catch (err) {
        console.error('Erro ao consultar dados:', err);
        await closeDB(connection);
        return res.status(500).json({ error: 'Erro ao consultar pessoa' });

    }
});

app.get('/user/all', async (req, res) => {
    const sql = `SELECT * FROM pessoas`;

    let connection;
    try {
        connection = await connectDB();
        const [result] = await connection.query(sql);

        if (result.length === 0) {
            await closeDB(connection);
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json(result);
        await closeDB(connection);
    } catch (err) {
        console.error('Erro ao consultar dados:', err);
        await closeDB(connection);
        return res.status(500).json({ error: 'Erro ao consultar pessoa' });

    }
});

app.post('/user', async (req, res) => {
    const { nome, idade, senha } = req.body;
    const sql = `INSERT INTO pessoas (nome, idade, senha) VALUES (?, ?, ?)`;

    let connection;
    try {
        connection = await connectDB();
        const [result] = await connection.query(sql, [nome, idade, senha]);
        res.status(201).json({ message: 'Cadastro realizado com sucesso', id: result.insertId });
        await closeDB(connection);
    } catch (err) {
        console.error('Erro ao inserir dados:', err);
        await closeDB(connection);
        return res.status(500).json({ error: 'Erro ao cadastrar pessoa' });
    }
});

app.put('/user', async (req, res) => {
    const { id, nome, idade, senha } = req.body;
    const sql = `UPDATE pessoas SET nome = ?, idade = ?, senha = ? WHERE id = ?`;
    let connection;
    try {
        connection = await connectDB();
        const [result] = await connection.query(sql, [nome, idade, senha, id]);

        if (result.affectedRows === 0) {
            await closeDB(connection);
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json({ message: 'Atualização realizada com sucesso' });
        await closeDB(connection);
    } catch (err) {
        console.error('Erro ao atualizar dados:', err);
        await closeDB(connection);
        return res.status(500).json({ error: 'Erro ao atualizar pessoa' });
    }
});

app.delete('/user', async (req, res) => {
    const { id } = req.body;
    const sql = `DELETE FROM pessoas WHERE id = ?`;

    let connection
    try {
        connection = await connectDB();
        const [result] = await connection.query(sql, [id]);

        if (result.affectedRows === 0) {
            await closeDB(connection);
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json({ message: 'Usuário deletado com sucesso' });
        await closeDB(connection);
    } catch (err) {
        console.error('Erro ao deletar dados:', err);
        await closeDB(connection);
        return res.status(500).json({ error: 'Erro ao deletar pessoa' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
