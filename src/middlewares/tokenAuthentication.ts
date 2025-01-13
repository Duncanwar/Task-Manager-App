import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { Response, Request, NextFunction } from "express";
import Responses from "../utils/response";

config();

declare global {
  namespace Express {
    interface Request {
      user?: string | jwt.JwtPayload;
    }
  }
}

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error("JWT_SECRET is not defined in the environment variables.");
}

const tokenAuthentication = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    Responses.error(res, 401, "Authorization header is missing or invalid", {});
    return;
  }

  const token = authorization.split(" ")[1];

  jwt.verify(token, jwtSecret, (err, payload) => {
    if (err) {
      Responses.error(res, 401, "Invalid or expired token", {});
      return;
    }
    req.user = payload; // Attach the user payload to the request
    next(); // Pass control to the next middleware
  });
};

export default tokenAuthentication;
