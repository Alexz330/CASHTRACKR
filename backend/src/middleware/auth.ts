import type { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
 const bearer = req.headers.authorization;

    if(!bearer){
      return res.status(401).json({ error: "No autorizado" });
    }

    const token = bearer.split(' ')[1];
    if(!token){
      return res.status(401).json({ error: "No autorizado" });
    }
    
    try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      if(typeof decoded === 'object' && decoded.id){
        const user = await User.findByPk(decoded.id, {
          attributes: ['id', 'name', 'email']
        });
        req.user = user;
        return next();
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Token no valido ' });
    }
}