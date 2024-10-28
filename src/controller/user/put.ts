import prisma from "../../../prisma/db";
import { User } from "../../modals/UserModal";

async function PUT(req: any, res: any) {
  const { id, firstname, surname, email }: User = req.body;

  try {
    const updatedRows = await prisma.user.update({
      data: {
        firstname,
        surname,
        email
      },
      where: { id: Number(id) }
    });

    if (!updatedRows) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(204).send(); // No Content
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
}

export { PUT };
