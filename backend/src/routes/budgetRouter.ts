import { body, param } from "express-validator";
import { Router } from "express";
import { BudgetController } from "../controllers/BudgetController";
import { handleInputErrors } from "../middleware/validation";
import { validateBudgetExist, validationBudgetId } from "../middleware/budget";
const router = Router();

router.param("budgetId", validationBudgetId);
router.param("budgetId", validateBudgetExist);

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
  "/:budgetId",
  BudgetController.getById
);
router.put(
  "/:budgetId",
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
  BudgetController.updateById
);
router.delete(
  "/:budgetId",
  BudgetController.deleteById
);
export default router;
