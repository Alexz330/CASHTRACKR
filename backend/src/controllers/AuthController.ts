import { Request, Response } from "express";
import { User } from "../models/User";
import { hashPassword } from "../ utils/auth";
import { generateToken } from "../ utils/token";
import { AuthEmail } from "../emails/AuthEmail";

export class AuthController {
  static async createAccount(req: Request, res: Response) {
    const { name, email, password } = req.body;
    //Prevenir usuarios duplicados
    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
      const error = new Error("El correo ya esta en uso");
      error.name = "UserExist";
      return res.status(400).json({ error: error.message });
    }

    try {
      //Hashear contraseña
      const hashedPassword = await hashPassword(password);
      const user = new User({ name, email, password: hashedPassword });
      //Generar token
      user.token = generateToken();
      await user.save();

      // Envio de correo de confirmacion
      AuthEmail.sendConfirmationEmail({
        name,
        email,
        token: user.token,
      });
      return res.status(201).json({ message: "Cuenta creada exitosamente" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async confirmAccount(req: Request, res: Response) {
    const { token } = req.body;

    try {
      const user = await User.findOne({ where: { token } });
      if (!user) {
        const error = new Error("Token no valido");
        error.name = "TokenInvalid";
        return res.status(401).json({ error: error.message });
      }
      user.token = null;
      user.confirmed = true;
      await user.save();
      return res
        .status(200)
        .json({ message: "Cuenta confirmada exitosamente" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
  }
}
