import prisma from "../../../prisma/db";
import { Product } from "../../modals/ProductModal";
import { handleCategory } from "../../service/hadlePut/handleCategory";
import { handleImages } from "../../service/hadlePut/handleImages";
import { handleOptions } from "../../service/hadlePut/handleOptions";

async function PUT(req: any, res: any) {
  const {
    id,
    enabled,
    name,
    slug,
    stock,
    useInMenu,
    description,
    price,
    priceWithDiscount,
    category_ids,
    
  }: Product = req.body;

  try {
    const updatedProduct = await prisma.product.update({
      data: {
        enabled,
        name,
        slug,
        stock: Number(stock),
        useInMenu,
        description,
        price: Number(price),
        priceWithDiscount: Number(priceWithDiscount)
      },
      where: {
        id: Number(id)
      }
    });

    if (category_ids) {
      const q = await handleCategory(updatedProduct.id, category_ids);
    }

    if (req.files) {
      const w = await handleImages(req.files, updatedProduct.id);
    }

    if (req.body.options) {
      const e = await handleOptions(req.body.options, updatedProduct.id);
    }

    res.status(200).json({
      message: "Produto atualizado com sucesso",
      product: updatedProduct,

    });
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    res.status(500).json({ message: "Erro ao atualizar produto", error });
  }
}

export { PUT };
