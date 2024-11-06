import prisma from "../../../prisma/db";

async function GETALL(req: any, res: any) {
  const { page = 1, limit = 10 } = req.query;
  const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

  try {
    const products = await prisma.product.findMany({
      skip,
      take: parseInt(limit, 10),
      include: {
        ProductCategory: true,
        ProductImage: true,
        ProductOption: true,
      },
    });

    const totalProducts = await prisma.product.count();
    const totalPages = Math.ceil(totalProducts / parseInt(limit, 10));

    res.status(200).json({
      products,
      pagination: {
        totalProducts,
        totalPages,
        currentPage: parseInt(page, 10),
        pageSize: parseInt(limit, 10),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(400).json({ message: "Bad Request" });
  }
}

export { GETALL };
