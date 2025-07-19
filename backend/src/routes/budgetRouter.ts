import { body, param } from "express-validator";
import { Router } from "express";
import { BudgetController } from "../controllers/BudgetController";
import { ExpenseController } from "../controllers/ExpenseController";
import { handleInputErrors } from "../middleware/validation";
import {
  validateBudgetInput,
  validateBudgetExist,
  validationBudgetId,
} from "../middleware/budget";

const router = Router();

router.param("budgetId", validationBudgetId);
router.param("budgetId", validateBudgetExist);

router.get("/", BudgetController.getAll);
router.post(
  "/",
  validateBudgetInput,
  handleInputErrors,
  BudgetController.create
);
router.get("/:budgetId", BudgetController.getById);
router.put(
  "/:budgetId",
  validateBudgetInput,
  handleInputErrors,
  BudgetController.updateById
);
router.delete("/:budgetId", BudgetController.deleteById);


/**Routes for expense */
router.get("/:budgetId/expense", ExpenseController.getAll);
router.post("/:budgetId/expense", ExpenseController.create);
router.get("/:budgetId/expense/:expenseId", ExpenseController.getById);
router.put("/:budgetId/expense/:expenseId", ExpenseController.updateById);
router.delete("/:budgetId/expense/:expenseId", ExpenseController.deleteById);
export default router;
