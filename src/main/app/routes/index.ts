import { Router } from "express";

import { permissionRouter } from "./account/permission.routes";
import { roleRouter } from "./account/role.routes";
import { usersRouter } from "./account/users.routes";

const router = Router();

router.use("/roles", roleRouter);
router.use("/permissions", permissionRouter);
router.use("/users", usersRouter);

export default router;
