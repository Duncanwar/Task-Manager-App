import { Router } from "express";

import auth from "./auth.route";

const route: Router = Router();

route.use("/auth", auth);

export default route;
