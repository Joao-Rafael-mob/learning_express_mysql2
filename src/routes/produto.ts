import express from "express";
import multer from "multer"; 
import { POST } from "../controller/product/post";

const storage = multer.memoryStorage(); 
const upload = multer({ storage }).fields([{ name: 'image', maxCount: 5 }]);

const router = express.Router();

router.post("/product", upload, POST); 
// router.get("/produtos", GET);
export default router;
