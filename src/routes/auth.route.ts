import { Router } from "express";
import AuthController from "../controllers/auth/AuthController";

const router = Router();

router.post("/signup", AuthController.signup);
import { errorHandler } from "../middlewares/errorHandler";
// router.use(errorHandler);
export default router;
