import fs from "fs";
import path from "path";
import prisma from "../../../prisma/db";
import { Product } from "../../modals/ProductModal";
import { Request, Response } from "express";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), "uploads");
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage }).array("image");

async function POST(req: Request, res: Response) {
  // Realizar o upload das imagens
  upload(req, res, async err => {
    if (err) {
      console.error("Erro no middleware de upload:", err);
      return res
        .status(500)
        .json({ message: "Erro ao fazer upload da imagem" });
    }

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
      // Criação do produto no Prisma
      const newProduct = await prisma.product.create({
        data: {
          enabled,
          name,
          slug,
          stock,
          description,
          price,
          priceWithDiscount
        }
      });

      // Processamento das imagens
      const imagePaths = [];
      if (req.files) {
        for (const file of req.files as Express.Multer.File[]) {
          const image = await prisma.productImage.create({
            data: {
              path: file.filename,
              enabled: true,
              productId: newProduct.id
            }
          });
          imagePaths.push(image);
        }
      }

      // Processamento das opções do produto
      const productOptions = JSON.parse(options);
      for (const option of productOptions) {
        await prisma.productOption.create({
          data: {
            title: option.title,
            shape: option.shape,
            radius: option.radius || 0,
            type: option.type,
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
  });
}

export { POST };
