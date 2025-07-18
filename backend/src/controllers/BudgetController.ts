import { Request, Response } from "express";

export class BudgetController {
  static getAll = async (req: Request, res: Response) => {
    try {
      res.json({ message: "Budgets" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener los presupuestos" });
    }
  };

  static create = async (req: Request, res: Response) => {
    try {
      res.json({ message: "Budget created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al crear el presupuesto" });
    }
  };
}
