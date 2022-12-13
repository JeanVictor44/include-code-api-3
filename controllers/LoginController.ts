import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userRepository } from "../repositories/userRepository";
import { BadRequestError } from "../helpers/api-errors";

class LoginController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    // verificar se o usuário existe
    // Caso exista verificar se a senha está correta7

    const user = await userRepository.findOneBy({ email });

    if (!user) {
      return res.status(400).json("E-mail ou senha inválidos")
    }

    const verifyPass = await bcrypt.compare(password, user.password);

    if (!verifyPass){
      return res.status(400).json("E-mail ou senha inválidos")
    }

    const jwtPass = process.env.JWT_PASS as string;

    // payload, password, expire
    const token = jwt.sign({ id: user.id }, jwtPass, { expiresIn: "8h" });
    const { password: _, ...userLogin } = user;

    return res.json({
      user: userLogin,
      token,
    });
  }
}

export default new LoginController();
