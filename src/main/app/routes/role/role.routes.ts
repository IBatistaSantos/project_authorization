import { Router } from "express";

import { adapterRoute } from "../../adapters/express/expressRouteAdapter";
import { makeCreateRoleController } from "../../factories/controller/role/roleController";

const roleRouter = Router();

const createRoleController = makeCreateRoleController();

roleRouter.post("/", adapterRoute(createRoleController));

export default roleRouter;
