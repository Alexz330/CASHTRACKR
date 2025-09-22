import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config(); 

export const generateJWT = (id:string) => {
    const token = jwt.sign({
        id,
    }, process.env.JWT_SECRET || "secret", {
        expiresIn: "1h"
    })
    return token;
}