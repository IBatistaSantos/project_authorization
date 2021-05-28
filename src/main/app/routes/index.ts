import { Router } from "express";

import permissionRouter from "./account/permission.routes";
import roleRouter from "./account/role.routes";

const router = Router();

router.use("/role", roleRouter);
router.use("/permission", permissionRouter);

export default router;
