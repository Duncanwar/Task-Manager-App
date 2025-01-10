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
      return Response.send(res, 400, "Invalid inputs", error.details[0]);

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    console.log({ userExists });

    if (userExists) {
      return Response.send(res, 409, "User already exists", {});
    }
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: { name, password: hashedPassword, email },
    });

    console.log(user);

    return Response.send(res, 201, "User created", user);
  });
}
