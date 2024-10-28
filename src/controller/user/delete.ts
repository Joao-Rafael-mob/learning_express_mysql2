import prisma from "../../../prisma/db";

async function DELETE(req: any, res: any) {
  const { id } = req.params;

  try {
    const deleteUser = prisma.user.delete({
      where: {
        id: Number(id)
      }
    });
    if (deleteUser === null) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (err) {
    console.error("Erro ao deletar dados:", err);
    return res.status(500).json({ error: "Erro ao deletar pessoa" });
  }
}
export { DELETE };
