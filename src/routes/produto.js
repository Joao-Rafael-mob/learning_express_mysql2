import express from "express";
import { POST } from "../controllers/product/post.js";

const router = express.Router();

router.post("/product", POST);

export default router;
