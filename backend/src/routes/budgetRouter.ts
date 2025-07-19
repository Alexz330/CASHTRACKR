import { body, param } from "express-validator";
import { Router } from "express";
import { BudgetController } from "../controllers/BudgetController";
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
export default router;
