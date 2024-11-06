import express from "express";
import { GETLIST } from "../controller/category/gefList";
import { POST } from "../controller/category/post";

const router = express.Router();

router.get("/category", GETLIST);
router.post("/category", POST);

export default router;
