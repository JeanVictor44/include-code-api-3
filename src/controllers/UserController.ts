import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";
import bcrypt from "bcrypt";
import { BadRequestError } from "../helpers/api-errors";

class UserController {
  async create(req: Request, res: Response) {
    const { name, lastName, isSocialName, email, age, ageNotInform, password } = req.body;
    // Validação de email, senha, lastName, name, caso idade seja 0 ou negativa o not inform = true, password validar quantidade de caracteres 
    
    
    const userExists = await userRepository.findOneBy({ email });
    
    if (userExists) {
      return res.status(400).json("E-mail já existe")
    }

    const hashPassword = await bcrypt.hash(password, 10); // Padrão 10

    const newUser = userRepository.create({
      name,
      lastName,
      isSocialName,
      age,
      ageNotInform,
      email,
      password: hashPassword,
    });
    await userRepository.save(newUser);
    const { password: _, ...userData } = newUser;

    return res.status(201).json(userData);
  }
}

export default new UserController();
