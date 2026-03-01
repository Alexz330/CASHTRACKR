import Router from "express";
import { body } from "express-validator";
import { AuthController } from "../controllers/AuthController";
import { handleInputErrors } from "../middleware/validation";
import { limiter } from "../config/limiter";
import { param } from "express-validator";
import { authenticate } from "../middleware/auth";

const router = Router();
router.use(limiter);
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

router.post(
  "/login",
  body("email").isEmail().withMessage("El correo no es valido"),
  body("password").notEmpty().withMessage("El password es obligatorio"),
  handleInputErrors,
  AuthController.login  
);
 
router.post('/forgot-password',
  body('email')
    .isEmail().withMessage('Email no válido'),
    handleInputErrors,
    AuthController.forgotPassword
)

router.post('/validate-token',
  body('token')
    .isLength({ min: 6 , max: 6})
    .withMessage('El token debe tener exactamente 6 caracteres')
    .notEmpty()
    .withMessage('El token no puede ir vacio'),
  handleInputErrors,
  AuthController.validateToken
)

router.post('/reset-password/:token',
  param('token')
  .isLength({ min: 6 , max: 6}).withMessage('Token no válido'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres'),
  handleInputErrors,
  AuthController.resetPasswordWithToken
)

router.get('/user', 
  authenticate,
  AuthController.user
)
export default router;
