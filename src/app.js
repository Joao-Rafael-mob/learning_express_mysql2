import express from "express";
import user from './routes/user.js'
import produto from './routes/produto.js'


const app = express();

app.use(express.json());

app.use("/api", user);

app.use("/api", produto)

export default app;
