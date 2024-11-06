import express from "express";
import { cadastraOrderProduct } from "../controller/PaymentTransaction/post";
import { fazerOPagamento } from "../controller/PaymentTransaction/teste";

const router = express.Router();

router.post("/compra", cadastraOrderProduct);
router.post("/pagamento", fazerOPagamento);


export default router;
