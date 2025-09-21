import { Request, Response } from "express";

export class AuthController{
    static createAccount(req: Request, res: Response){
        res.json({message: "create account"})        
    }
}