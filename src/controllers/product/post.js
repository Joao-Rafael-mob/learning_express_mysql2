import fs from "fs";
import multer from "multer";
import path from "path";
import Product from "../../config/dbProduct.js";
import ImgProduct from "../../config/dbImgProduct.js";
import ProductOption from "../../config/dbOptionProduct.js";

function ensureUploadDirExists() {
  const uploadDir = path.join(process.cwd(), "uploads");
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("Pasta de uploads criada:", uploadDir);
  }
}

ensureUploadDirExists();

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

async function POST(req, res) {
  upload(req, res, async (err) => {
    if (err) {
      console.error("Erro no middleware de upload:", err);
      return res.status(500).json({ message: "Erro ao fazer upload da imagem" });
    }

    const {
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount,
      options
    } = req.body;

    try {
      const newProduct = await Product.create({
        enabled: enabled || true,
        name,
        slug,
        stock: stock || 0,
        description,
        price,
        price_with_discount,
      });

      if (req.files) {
        for (const file of req.files) {
          const imgProduct = {
            product_id: newProduct.id,
            enabled: true,
            path: file.filename
          };

          await ImgProduct.create(imgProduct);
        }
      }

      if (options) {
        let parsedOptions;
        try {
          parsedOptions = JSON.parse(options);
        } catch (parseError) {
          return res.status(400).json({ message: "Formato de opções inválido." });
        }
    
        if (Array.isArray(parsedOptions)) {
          for (const option of parsedOptions) {
            const productOption = {
              product_id: newProduct.id,
              title: option.title,
              shape: option.shape || "square",
              radius: option.radius || 0,
              type: option.type || "text",
              values: JSON.stringify(option.values)
            };
            await ProductOption.create(productOption);
          }
        } else {
          return res.status(400).json({ message: "As opções devem ser um array." });
        }
      }

      res.status(201).json({
        message: "Produto criado com sucesso",
        product_id: newProduct.id
      });
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      res.status(500).json({ message: "Erro ao cadastrar produto" });
    }
  });
}

export { POST };
