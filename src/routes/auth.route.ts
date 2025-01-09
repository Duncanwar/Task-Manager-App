import { Router } from "express";

const router = Router();

router.post("/signup", (req, res) => {
  res.send("Hello!");
});

export default router;
