import { Request, Response } from "express";
import Budget from "../models/Budget";

export class BudgetController {
  static getAll = async (req: Request, res: Response) => {
    try {
      const budgets = await Budget.findAll({
        order: [["createdAt", "DESC"]],
        // Todo: filtrar por usuario autenticado
      });
      res.json(budgets);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener los presupuestos" });
    }
  };

  static create = async (req: Request, res: Response) => {
    try {
      const { name, amount } = req.body;
      const budget = await Budget.create({ name, amount });
      await budget.save();
      res.status(201).json({ message: "Presupuesto creado exitosamente" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al crear el presupuesto" });
    }
  };

  static getById = async (req: Request, res: Response) => {
   const budget = await Budget.findByPk(req.params.budgetId,{
    include: ["expenses"]
   });
   if (!budget) {
    const error = new Error("Presupuesto no encontrado");
    return res.status(404).json({ message: error.message });
   }
   res.json({budget});
  };

  static updateById = async (req: Request, res: Response) => {
   const budget = req.budget;
   const { name, amount } = req.body;
   budget.name = name;
   budget.amount = amount;
   await budget.save();
   res.json({ message: "Presupuesto actualizado exitosamente", budget });
  };

  static deleteById = async (req: Request, res: Response) => {
   const budget = req.budget;
   await budget.destroy();
   res.json({ message: "Presupuesto eliminado exitosamente" });
  };
}
