import { NextFunction, Request, Response } from "express";
import { param, validationResult } from "express-validator";
import Budget from "../models/Budget";

declare global {
    namespace Express {
        interface Request {
            budget?: Budget;
        }
    }
}

export const validationBudgetId = async(req: Request, res: Response, next: NextFunction) => {
    await param("budgetId").isInt().withMessage("Id no valido").custom((value) => value > 0).withMessage("Id no valido").run(req);
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }   
    next();
};

export const validateBudgetExist = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const budget = await Budget.findByPk(req.params.budgetId);
        if (!budget) {
            const error = new Error("Presupuesto no encontrado");
            return res.status(404).json({ message: error.message });
        }
        req.budget = budget;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener el presupuesto" });
    }
};