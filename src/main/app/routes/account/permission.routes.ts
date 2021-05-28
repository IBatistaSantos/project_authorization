import { Router } from "express";

import { adapterRoute } from "../../adapters/express/expressRouteAdapter";
import { makeCreatePermisssionController } from "../../factories/controller/account/permissionController";

const permissionRouter = Router();

const createPermissionController = makeCreatePermisssionController();

permissionRouter.post("/", adapterRoute(createPermissionController));

export { permissionRouter };
