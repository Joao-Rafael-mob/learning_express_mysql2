import prisma from "../../../prisma/db";

async function GETLIST(req: any, res: any) {
  const { limit = 12, page = 1 } = req.query;
  const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

  try {
    const getListCategory = await prisma.productCategory.findMany({
      skip: skip,
      take: parseInt(limit, 10)
    });
    const totalProducts = await prisma.category.count();
    const totalPages = Math.ceil(totalProducts / parseInt(limit, 10));
    res.status(200).json({
      message: "Categoria lista com sucesso",
      getListCategory,
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

export { GETLIST };
