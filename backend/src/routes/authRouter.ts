import Router from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/AuthController";
import { handleInputErrors } from "../middleware/validation";
import { limiter } from "../config/limiter";

const router = Router();

router.post(
  "/create-account",
  body("name").notEmpty().withMessage("El nombre no puede ir vacio"),
  body("email").isEmail().withMessage("El correo no es valido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
  handleInputErrors,
  AuthController.createAccount
);

router.post(
  "/confirm-account",
  limiter,
  body("token")
    .isLength({ min: 6 , max: 6})
    .withMessage("El token debe tener exactamente 6 caracteres")
    .notEmpty()
    .withMessage("El token no puede ir vacio"),
  handleInputErrors,
  AuthController.confirmAccount
);

export default router;
