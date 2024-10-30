import prisma from "../../../prisma/db";

async function GET(req: any, res: any) {
  const  id  = parseInt(req.query.id, 10);


  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }
  try {
    const product = await prisma.product.findUnique({
      where: {
        id
      },
      include: {
        ProductCategory: true,
        ProductImage: true,
        ProductOption: true,
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      product
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(400).json({ message: "Bad Request" });
  }
}

export { GET };
