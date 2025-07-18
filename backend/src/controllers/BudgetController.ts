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

  static getById = async (req: Request, res: Response) => {
    try {
      res.json({ message: "Budget by id" });
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
