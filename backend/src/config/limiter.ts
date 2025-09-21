import { rateLimit } from "express-rate-limit";

export const limiter = rateLimit({
    windowMs:  60 * 1000, // 15 minutos
    max: 5,
    message: {"error":"Has alcanzado el límite de peticiones por hora"}
});