"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../controllers/auth/AuthController"));
// import errorHandler from "../middlewares/errorHandler";
const router = (0, express_1.Router)();
router.post("/signup", AuthController_1.default.signup);
// router.use(errorHandler);
exports.default = router;
