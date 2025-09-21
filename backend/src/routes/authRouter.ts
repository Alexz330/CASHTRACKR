import Router from "express";
import { AuthController } from "../controllers/AuthController";

const router = Router();

router.post("/create-account", AuthController.createAccount);

export default router;