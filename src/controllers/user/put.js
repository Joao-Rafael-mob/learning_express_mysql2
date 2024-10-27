import  User  from "../../config/dbUser.js";

async function PUT(req, res) {
  const { id } = req.params;
  const { firstname, surname, email } = req.body;

  try {
    const updatedRows = await User.update(
      {
        firstname,
        surname,
        email,
      },
      {
        where: { id },
      }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(204).send(); // No Content
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
}

export { PUT };
