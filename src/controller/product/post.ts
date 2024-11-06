import prisma from "../../../prisma/db";
import { Product } from "../../modals/ProductModal";
import { handleCategory } from "../../service/handlePost/handleCategory";
import { handleImages } from "../../service/handlePost/handleImages";
import { handleOptions } from "../../service/handlePost/handleOptions";

async function POST(req: any, res: any) {
  console.log("Request Body:", req.body);
  const {
    enabled,
    name,
    slug,
    stock,
    description,
    price,
    priceWithDiscount,
    category_ids
  } = req.body;

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
        stock: parseFloat(stock),
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
    res.status(500).json({ message: "Erro ao cadastrar produto", error });
  }
}

export { POST };
