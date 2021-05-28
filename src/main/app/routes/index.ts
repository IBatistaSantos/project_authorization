import { Router } from "express";

import roleRouter from "./role/role.routes";

const router = Router();

router.use("/role", roleRouter);

export default router;
