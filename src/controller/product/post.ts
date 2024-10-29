import prisma from "../../../prisma/db";
import { Product } from "../../modals/ProductModal";
import { handleCategory } from "./handlePost/handleCategory";
import { handleImages } from "./handlePost/handleImages";
import { handleOptions } from "./handlePost/handleOptions";

async function POST(req: any, res: any) {
  console.log("Request Body:", req.body);
  const {
    enabled = true,
    name,
    slug,
    stock = 0,
    description,
    price,
    priceWithDiscount,
    category_ids
  }: Product = req.body;

  if (!name || !slug || !description || !price) {
    return res.status(400).json({
      message: "Nome, slug, descrição e preço são obrigatórios."
    });
  }

  try {
    const newProduct = await prisma.product.create({
      data: {
        enabled,
        name,
        slug,
        stock,
        description,
        price: Number(price),
        priceWithDiscount: Number(priceWithDiscount)
      }
    });
    const category = await handleCategory(newProduct.id, category_ids);

    const imagePaths = await handleImages(req.files, newProduct.id);

    const option = await handleOptions(req.body.options, newProduct.id);

    return res.status(201).json({
      message: "Produto criado com sucesso",
      product: newProduct,
      imagePaths,
      option,
      category
    });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ message: "Erro ao cadastrar produto" });
  }
}

export { POST };
