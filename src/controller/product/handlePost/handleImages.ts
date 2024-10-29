import prisma from "../../../../prisma/db";
import { saveImg } from "../../../service/saveimg";

export async function handleImages(files: any, productId: number) {
  const imagePaths = [];

  if (files && files.image) {
    try {
      for (const file of files.image as Express.Multer.File[]) {
        const imagePath = await saveImg(file);
        const image = await prisma.productImage.create({
          data: {
            path: imagePath,
            enabled: true,
            productId: productId,
          },
        });
        imagePaths.push(image);
      }
    } catch (error) {
      console.error("Erro ao salvar imagens:", error);
      throw new Error("Erro ao salvar as imagens do produto");
    }
  } else {
    console.log("Nenhum arquivo de imagem enviado.");
  }

  return imagePaths;
}