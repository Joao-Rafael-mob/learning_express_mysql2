import express from "express";
import { POST } from "../controllers/user/post.js";
import { PUT } from "../controllers/user/put.js";
import { GETID } from "../controllers/user/get.js";
import { DELETE } from "../controllers/user/delete.js";

const router = express.Router();

router.post("/user", POST);
router.put("/user/:id", PUT);
router.get("/user/:id", GETID);
router.delete("/user/:id", DELETE);

export default router;
