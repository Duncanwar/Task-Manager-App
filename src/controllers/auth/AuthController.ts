import catchAsync from "../../utils/catchAsync";
import prisma from "../../client";
import { hashPassword } from "../../utils/helpers";
import { ConflictException } from "../../utils/exception";
import Response from "../../utils/response";
import { userSchema } from "../../validations/User.validation";

export default class AuthController {
  static signup = catchAsync(async (req, res) => {
    const { name, email, password } = req.body;

    const { error } = userSchema.validate(req.body);

    if (error)
      return Response.error(
        res,
        400,
        "Invalid inputs",
        error.details[0].message.slice(0, 1)[0]
      );

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return Response.error(res, 409, "User already exists", {});
    }
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { name, password: hashedPassword, email },
    });

    return Response.success(res, 201, "User created", user);
  });

  static login = catchAsync(async (req, res) => {});
}
