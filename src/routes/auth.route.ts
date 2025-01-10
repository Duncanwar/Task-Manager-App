import { Router } from "express";
import AuthController from "../controllers/auth/AuthController";
// import errorHandler from "../middlewares/errorHandler";

const router = Router();

router.post("/signup", AuthController.signup);
// router.use(errorHandler);
export default router;
