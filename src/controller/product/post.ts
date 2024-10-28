import prisma from "../../../prisma/db";
import { Product } from "../../modals/ProductModal";
import { saveImg } from "../../service/saveimg";

async function POST(req: any, res: any) {
  console.log("Request Body:", req.body);
  const {
    enabled = true,
    name,
    slug,
    stock = 0,
    description,
    price,
    priceWithDiscount
  }: Product = req.body;

  const options = req.body.options;

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

    const imagePaths = [];
    if (req.files && req.files.image) { 
      for (const file of req.files.image as Express.Multer.File[]) {
        const imagePath = await saveImg(file);
        const image = await prisma.productImage.create({
          data: {
            path: imagePath,
            enabled: true,
            productId: newProduct.id
          }
        });
        imagePaths.push(image);
      }
    } else {
      console.log("Nenhum arquivo enviado."); 
    }

    const productOptions = JSON.parse(options);
    for (const option of productOptions) {
      await prisma.productOption.create({
        data: {
          title: option.title,
          shape: option.shape.toUpperCase(),
          radius: option.radius || 0,
          type: option.type.toUpperCase(),
          values: JSON.stringify(option.values),
          productId: newProduct.id
        }
      });
    }

    return res.status(201).json({
      message: "Produto criado com sucesso",
      product: newProduct,
      images: imagePaths
    });
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    res.status(500).json({ message: "Erro ao cadastrar produto" });
  }
}

export { POST };
