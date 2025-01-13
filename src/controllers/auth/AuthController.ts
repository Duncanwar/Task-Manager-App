import catchAsync from "../../utils/catchAsync";
import prisma from "../../client";
import {
  comparePassword,
  exclude,
  generateToken,
  hashPassword,
} from "../../utils/helpers";
import { ConflictException } from "../../utils/exception";
import Response from "../../utils/response";
import { loginSchema, signupSchema } from "../../validations/User.validation";

export default class AuthController {
  static signup = catchAsync(async (req, res) => {
    const { name, email, password } = req.body;

    const { error } = signupSchema.validate(req.body);

    if (error) {
      const validationErrors = error.details.map((err) => err.message);
      return Response.error(res, 400, "Validation Error", {
        errors: validationErrors,
      });
    }

    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      return Response.error(res, 409, "User already exists", {});
    }

    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { name, password: hashedPassword, email },
      select: { id: true, name: true, email: true }, // Exclude password at query level
    });

    return Response.success(res, 201, "User created", user);
  });

  static login = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    const { error } = loginSchema.validate(req.body);

    if (error) {
      const validationErrors = error.details.map((err) => err.message);
      return Response.error(res, 400, "Validation Error", {
        errors: validationErrors,
      });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      // select: { id: true, name: true, email: true, password: true }, // Include password for comparison
    });

    if (!user || !(await comparePassword(password, user.password))) {
      return Response.error(res, 422, "Invalid email or password", {});
    }

    const accessToken = generateToken({ id: user.id });
    // const safeUser = exclude(user, ["password"]);

    return Response.success(res, 200, "Logged in successfully", {
      accessToken,
      user,
    });
  });
}
