import { Router } from "express";

import { adapterRoute } from "../../adapters/express/expressRouteAdapter";
import { makeCreateRoleController } from "../../factories/controller/account/roleController";
import { auth } from "../../middlewares/auth";
import { can } from "../../middlewares/can";

const roleRouter = Router();

const createRoleController = makeCreateRoleController();

roleRouter.post("/", auth, can, adapterRoute(createRoleController));

export { roleRouter };
