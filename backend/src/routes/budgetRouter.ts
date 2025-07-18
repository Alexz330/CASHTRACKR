import { body, param } from "express-validator";
import { Router } from "express";
import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";
const router = Router();

router.get("/", BudgetController.getAll);
router.post(
  "/",
  body("name")
    .notEmpty()
    .withMessage("El nombre del presupuesto es obligatorio"),
  body("amount")
    .notEmpty()
    .withMessage("El monto del presupuesto es obligatorio")

    .isNumeric()
    .withMessage("El monto del presupuesto debe ser un número")
    .custom((value) => value > 0)
    .withMessage("El monto del presupuesto debe ser mayor a 0"),
  handleInputErrors,
  BudgetController.create
);
router.get(
  "/:id",
  param("id")
    .isInt()
    .withMessage("Id no valido")
    .custom((value) => value > 0)
    .withMessage("Id no valido"),
  handleInputErrors,
  BudgetController.getById
);
router.put(
  "/:id",
  param("id")
    .isInt()
    .withMessage("Id no valido")
    .custom((value) => value > 0)
    .withMessage("Id no valido"),
  handleInputErrors,
  BudgetController.updateById
);
router.delete(
  "/:id",
  param("id")
    .isInt()
    .withMessage("Id no valido")
    .custom((value) => value > 0)
    .withMessage("Id no valido"),
  handleInputErrors,
  BudgetController.deleteById
);
export default router;
