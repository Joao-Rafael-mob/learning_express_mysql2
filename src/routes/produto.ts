import express from "express";
import multer from "multer";
import { POST } from "../controller/product/post";
import { GET } from "../controller/product/get";
import { PUT } from "../controller/product/put";

const storage = multer.memoryStorage();
const upload = multer({ storage }).fields([{ name: "image", maxCount: 5 }]);

const router = express.Router();

router.post("/product", upload, POST);
router.get("/product", GET);
router.put("/product", upload, PUT);
export default router;
