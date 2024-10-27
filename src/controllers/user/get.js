import User  from "../../config/dbUser.js";

async function GETID(req, res) {
  const { id } = req.params;

  try {
    const findUser = await User.findOne({
      where: {
        id
      }
    });

    if (!findUser) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    res.status(200).json(findUser);
  } catch (err) {
    console.error("Erro ao consultar dados:", err);
    return res.status(500).json({ error: "Erro ao consultar pessoa" });
  }
}

export { GETID };
