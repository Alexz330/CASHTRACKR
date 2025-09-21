import { Request, Response } from "express";
import { User } from "../models/User";
import { hashPassword } from "../ utils/auth";

export class AuthController{
    static async createAccount(req: Request, res: Response){
        const {name, email, password} = req.body;
        //Prevenir usuarios duplicados
        const userExist = await User.findOne({where: {email}});

        if(userExist){
            const error = new Error("El correo ya esta en uso");
            error.name = "UserExist";
            return res.status(400).json({error: error.message});
        }

        try{
            const hashedPassword = await hashPassword(password);
            await User.create({name, email, password: hashedPassword});
            return res.status(201).json({message: "Cuenta creada exitosamente"});
        }catch(error){
            console.log(error);
            return res.status(500).json({error: error.message})
        }
    }
}