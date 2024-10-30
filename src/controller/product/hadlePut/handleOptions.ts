import prisma from "../../../../prisma/db";

export async function handleOptions(options: any, productId: number) {
  const createdOptions = [];

  try {

    
    const productOptions = JSON.parse(options);
    
    await prisma.productOption.deleteMany({
      where: {
        productId: productId,
      },
    });

    for (const option of productOptions) {
      const createdOption = await prisma.productOption.create({
        data: {
          title: option.title,
          shape: option.shape.toUpperCase(),
          radius: option.radius || 0,
          type: option.type.toUpperCase(),
          values: JSON.stringify(option.values),
          productId: productId
        }
      });
      createdOptions.push(createdOption);
    }
  } catch (error) {
    console.error("Erro ao salvar opções de produto:", error);
    throw new Error("Erro ao salvar as opções do produto");
  }

  return createdOptions;
}
