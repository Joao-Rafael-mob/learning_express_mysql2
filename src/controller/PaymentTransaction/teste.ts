import { PaymentStatus } from "@prisma/client";
import prisma from "../../../prisma/db";

async function fazerOPagamento(req: any, res: any) {
    const { orderId, userId, paymentStatus, totalAmount } = req.body;
  
    try {
      const paymentTransaction = await prisma.paymentTransaction.create({
        data: {
          orderId,
          userId,
          amount: totalAmount,
          method: paymentStatus.method,
          status: PaymentStatus.PENDING,
          transactionDate: new Date(),
          details: paymentStatus.details
        }
      });
  
      res.status(200).json(paymentTransaction);
    } catch (error) {
      console.error("Erro ao processar o pagamento:", error);
      res.status(500).json({ error: "Erro ao processar o pagamento" });
    }
  }
  
  export { fazerOPagamento };
  