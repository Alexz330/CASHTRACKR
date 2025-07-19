import type { Request, Response, NextFunction } from "express";
import { validationResult, body} from "express-validator";

export const validateExpenseInput = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await body("name")
        .notEmpty()
        .withMessage("El nombre de la gasto es obligatorio")
        .run(req);
    await body("amount")
        .notEmpty()
        .withMessage("El monto del gasto es obligatorio")

        .isNumeric()
        .withMessage("El monto del gasto debe ser un número")
        .custom((value) => value > 0)
        .withMessage("El monto del gasto debe ser mayor a 0")
        .run(req);
    next();
};