import bcrypt from "bcrypt";
import prisma from "../../../prisma/db";
import { User } from "../../modals/UserModal";

async function POST(req: any, res: any) {
  const {
    firstname,
    surname,
    email,
    password,
    confirmPassword
  }: User = req.body;
  try {
    if (!firstname || !surname || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "As senhas não conferem" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const hashSenha = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstname,
        surname,
        email,
        password: hashSenha,
      }
    });

    res.status(201).json({
      message: "Cadastro realizado com sucesso",
      user
    });
  } catch (error) {
    console.error("Erro ao inserir dados:", error);
    return res.status(500).json({ error: "Erro ao cadastrar pessoa" });
  }
}
export { POST };
