import prisma from "../../../prisma/db";

export async function handleCategory(productId: number, categoryIds: string) {
  try {
    const categoryIdsArray = categoryIds
      .split(",")
      .map((id: string) => Number(id.trim()));
    


    const dataToInsert = categoryIdsArray.map((categoryId: number) => ({
      productId: productId,
      categoryId: categoryId,
    }));

    const categoriesAssociadas = await prisma.productCategory.createMany({
      data: dataToInsert,
      skipDuplicates: true, 
    });

    return categoriesAssociadas;
  } catch (error) {
    console.error("Erro ao associar categorias: essa categoria possa nao existe", );
    throw new Error("Erro ao associar categorias");
  }
}
