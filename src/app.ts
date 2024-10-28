import express from "express";
import user from "./routes/user";
import produto from "./routes/produto";

const app = express();

app.use(express.json());

app.use("/api", user);

app.use("/api", produto);

export default app;


