import express from "express";
import user from "./routes/user";
import produto from "./routes/produto";
import category from "./routes/category";
import compra from "./routes/compra";

const app = express();

app.use(express.json());

app.use("/api", user);

app.use("/api", produto);

app.use("/api", category);

app.use("/api", compra);

export default app;
