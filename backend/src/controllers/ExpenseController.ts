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
  static getById = async (req: Request, res: Response) => {
    res.status(200).json(req.expense);
  };
  static updateById = async (req: Request, res: Response) => {
    const {name, amount} = req.body;
    const expense = req.expense;
    expense.name = name;
    expense.amount = amount;
    await expense.save();
    res.status(200).json({message: "Gasto actualizado exitosamente", expense});

  };
  static deleteById = async (req: Request, res: Response) => {
    const expense = req.expense;
    await expense.destroy();
    res.status(200).json({message: "Gasto eliminado exitosamente", expense});
  };
}
