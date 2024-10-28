import express from "express";
import { POST } from "../controller/product/post";


const router = express.Router();

router.post("/product", POST);
//router.get("/produtos", GET);
export default router;
