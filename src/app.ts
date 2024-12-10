import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const app = express();
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});
const port = process.env.PORT || 7000;

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("hi");
});

const connectToDB = async () => {
  try {
    const conn = await pool.connect();
    if (conn) return console.log("connected to database");
  } catch (err) {
    console.log(err);
  }
};

connectToDB();

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
