import { Router } from "express";

import { adapterRoute } from "../../adapters/express/expressRouteAdapter";
import { makeCreateUserController } from "../../factories/controller/account/userController";

const usersRouter = Router();

const createUserController = makeCreateUserController();

usersRouter.post("/", adapterRoute(createUserController));

export { usersRouter };
