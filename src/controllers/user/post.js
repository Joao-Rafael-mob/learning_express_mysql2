import bcrypt from "bcrypt";
import  User  from "../../config/dbUser.js";

async function POST(req, res) {
  const { firstname, surname, email, password, confirmPassword } = req.body;
  try {
    if (!firstname || !surname || !email || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "As senhas não conferem" });
    }

    const hashSenha = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstname,
      surname,
      email,
      password: hashSenha
    });

    res.status(201).json({
      message: "Cadastro realizado com sucesso",
      id: user.id
    });
  } catch (err) {
    console.error("Erro ao inserir dados:", err);

    if (err.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "O email já está em uso" });
    }

    return res.status(500).json({ error: "Erro ao cadastrar pessoa" });
  }
}
export { POST };
