import { Router } from "express";

import { adapterRoute } from "../../adapters/express/expressRouteAdapter";
import { makeCreatePermisssionController } from "../../factories/controller/account/permissionController";
import { auth } from "../../middlewares/auth";
import { can } from "../../middlewares/can";

const permissionRouter = Router();

const createPermissionController = makeCreatePermisssionController();

permissionRouter.post("/", auth, can, adapterRoute(createPermissionController));

export { permissionRouter };
