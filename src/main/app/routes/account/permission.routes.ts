import { Router } from "express";

import { adapterRoute } from "../../adapters/express/expressRouteAdapter";
import { makeCreatePermisssionController } from "../../factories/controller/account/permissionController";
import { auth } from "../../middlewares/auth";
import { is } from "../../middlewares/is";

const permissionRouter = Router();

const createPermissionController = makeCreatePermisssionController();

permissionRouter.post("/", auth, is, adapterRoute(createPermissionController));

export { permissionRouter };
