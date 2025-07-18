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
    try {
      const { id } = req.params;
      const budget = await Budget.findByPk(id);
      if (!budget) {
        const error = new Error("Presupuesto no encontrado");
        return res.status(404).json({ message: error.message });
      }
      res.json(budget);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al obtener el presupuesto" });
    }
  };

  static updateById = async (req: Request, res: Response) => {
    try {
      res.json({ message: "Budget updated by id" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al actualizar el presupuesto" });
    }
  };

  static deleteById = async (req: Request, res: Response) => {
    try {
      res.json({ message: "Budget deleted by id" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error al eliminar el presupuesto" });
    }
  };
}
