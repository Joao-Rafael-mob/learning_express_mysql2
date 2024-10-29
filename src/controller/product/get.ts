import prisma from "../../../prisma/db";

async function GET(req: any, res: any) {
  const { id } = req.params;
  try {
    const products = await prisma.productOption.findFirst({
      where: {
        id
      }
    });

    res.status(200).json({
      data: products
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(400).json({ message: "Bad Request" });
  }
}

export { GET };
