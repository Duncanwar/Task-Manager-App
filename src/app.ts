import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 7000;

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.send("hi");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
