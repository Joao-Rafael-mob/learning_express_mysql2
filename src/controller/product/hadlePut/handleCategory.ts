import prisma from "../../../../prisma/db";

export async function handleCategory(productId: number, categoryIds: string) {
  try {
    await prisma.productCategory.deleteMany({
      where: {
        productId: productId
      }
    });
    const categoryIdsArray = categoryIds
      .split(",")
      .map((id: string) => Number(id.trim()));

    const categoriesAssociadas = await Promise.all(
      categoryIdsArray.map(async (categoryId: number) => {
        return prisma.productCategory.create({
          data: {
            productId: productId,
            categoryId: categoryId
          }
        });
      })
    );
    return categoriesAssociadas;
  } catch (error) {
    console.error("Erro ao associar categorias:", error);
    throw new Error("Erro ao associar categorias");
  }
}
