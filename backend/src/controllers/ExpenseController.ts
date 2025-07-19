import type { Request, Response } from "express";
import { Expense } from "../models/Expense";

export class ExpenseController {
  static getAll = async (req: Request, res: Response) => {};
  static create = async (req: Request, res: Response) => {
    try {
      const expense = new Expense(req.body);
      expense.budgetId = Number(req.params.budgetId);
      
      await expense.save();
    
      res.status(201).json({message: "Gasto creado exitosamente", expense});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al crear el gasto" });
    }
  };
  static getById = async (req: Request, res: Response) => {};
  static updateById = async (req: Request, res: Response) => {};
  static deleteById = async (req: Request, res: Response) => {};
}
