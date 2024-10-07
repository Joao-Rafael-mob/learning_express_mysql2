import express from 'express';
import { connectDB, closeDB } from './db.js';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/user', async (req, res) => {
    const { id } = req.query;
    const sql = `SELECT id FROM pessoas WHERE id = ?`;

    try {
        const connection = await connectDB();
        const [result] = await connection.query(sql, [id]);

        if (result.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json(result[0]);
    } catch (err) {
        console.error('Erro ao consultar dados:', err);
        return res.status(500).json({ error: 'Erro ao consultar pessoa' });
    } finally {
        await closeDB(connection);
    }
});

app.post('/user', async (req, res) => {
    const { nome, idade, senha } = req.body;
    const sql = `INSERT INTO pessoas (nome, idade, senha) VALUES (?, ?, ?)`;

    try {
        const connection = await connectDB();
        const [result] = await connection.query(sql, [nome, idade, senha]);
        res.status(201).json({ message: 'Cadastro realizado com sucesso', id: result.insertId });
    } catch (err) {
        console.error('Erro ao inserir dados:', err);
        return res.status(500).json({ error: 'Erro ao cadastrar pessoa' });
    } finally {
        await closeDB(connection);
    }
});

app.put('/user', async (req, res) => {
    const { id, nome, idade, senha } = req.body;
    const sql = `UPDATE pessoas SET nome = ?, idade = ?, senha = ? WHERE id = ?`;

    try {
        const connection = await connectDB();
        const [result] = await connection.query(sql, [nome, idade, senha, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json({ message: 'Atualização realizada com sucesso' });
    } catch (err) {
        console.error('Erro ao atualizar dados:', err);
        return res.status(500).json({ error: 'Erro ao atualizar pessoa' });
    } finally {
        await closeDB(connection);
    }
});

app.delete('/user', async (req, res) => {
    const { id } = req.body;
    const sql = `DELETE FROM pessoas WHERE id = ?`;

    try {
        const connection = await connectDB();
        const [result] = await connection.query(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
        console.error('Erro ao deletar dados:', err);
        return res.status(500).json({ error: 'Erro ao deletar pessoa' });
    } finally {
        await closeDB(connection);
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
