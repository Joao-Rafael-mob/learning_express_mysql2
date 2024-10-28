import express from "express";

import { POST } from "../controller/user/post";
import { GETID } from "../controller/user/get";
import { PUT } from "../controller/user/put";
import { DELETE } from "../controller/user/delete";

const router = express.Router();

router.post("/user", POST);
router.put("/user/:id", PUT);
router.get("/user/:id", GETID);
router.delete("/user/:id", DELETE);

export default router;
