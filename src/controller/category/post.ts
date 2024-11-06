import prisma from "../../../prisma/db";
import { Category } from "../../modals/CategoryModal";

async function POST(req: any, res: any) {
  const { name, slug, useInMenu }: Category = req.body;

  try {
    const postCategory = await prisma.category.create({
      data: {
        name,
        slug,
        useInMenu
      }
    });

    res.status(201).json({
      message: "Categoria cadatrada com sucesso",
      postCategory
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(400).json({ message: "Bad Request" });
  }
}

export { POST };
