import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";

export async function saveImg(
  imageFile: Express.Multer.File,
  existingImageUrl?: string
): Promise<string> {
  const uploadDir = path.join(process.cwd(), "public", "images");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  let imageFileName: string;

  if (existingImageUrl) {
    const existingImagePath = path.join(
      process.cwd(),
      "public",
      existingImageUrl
    );

    if (fs.existsSync(existingImagePath)) {
      fs.unlinkSync(existingImagePath);
    }

    imageFileName = path.basename(existingImageUrl);
  } else {
    imageFileName = `${randomUUID()}-${imageFile.originalname}`;
  }
  const imagePath = path.join(uploadDir, imageFileName);

  fs.writeFileSync(imagePath, imageFile.buffer);

  return `/images/${imageFileName}`;
}
