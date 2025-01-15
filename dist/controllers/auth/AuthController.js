"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const client_1 = __importDefault(require("../../client"));
const helpers_1 = require("../../utils/helpers");
const response_1 = __importDefault(require("../../utils/response"));
const User_validation_1 = require("../../validations/User.validation");
class AuthController {
}
_a = AuthController;
AuthController.signup = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const { error } = User_validation_1.userSchema.validate(req.body);
    if (error)
        return response_1.default.success(res, 400, "Invalid inputs", error.details[0]);
    const userExists = yield client_1.default.user.findUnique({
        where: { email },
    });
    console.log({ userExists });
    if (userExists) {
        return response_1.default.error(res, 409, "User already exists", {});
    }
    const hashedPassword = yield (0, helpers_1.hashPassword)(password);
    const user = yield client_1.default.user.create({
        data: { name, password: hashedPassword, email },
    });
    console.log(user);
    return response_1.default.success(res, 201, "User created", user);
}));
exports.default = AuthController;
