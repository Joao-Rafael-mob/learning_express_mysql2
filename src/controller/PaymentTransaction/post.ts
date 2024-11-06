import { FormaDePagamento, PaymentStatus } from "@prisma/client";
import prisma from "../../../prisma/db";

async function cadastraOrderProduct(req: any, res: any) {
  const { userId, products } = req.body;

  try {
    const result = await prisma.$transaction(async tx => {
      const order = await tx.order.create({
        data: {
          userId,
          orderDate: new Date(),
          status: "Pendente"
        }
      });

      let totalAmount = 0;
      
      for (const product of products) {
        const productData = await tx.product.findUnique({
          where: { id: product.productId }
        });

        if (!productData) {
          throw new Error(`Produto com ID ${product.productId} não encontrado.`);
        }

        await tx.orderProduct.create({
          data: {
            orderId: order.id,
            productId: product.productId,
            quantity: product.quantity,
            price: productData.price
          }
        });

        totalAmount += productData.price * product.quantity;
      }

      return { order, totalAmount };
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao criar o pedido:", error);
    res.status(500).json({ error: "Erro ao criar o pedido" });
  }
}

export { cadastraOrderProduct };
