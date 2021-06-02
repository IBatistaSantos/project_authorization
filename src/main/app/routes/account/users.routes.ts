import { Router } from "express";

import { adapterRoute } from "../../adapters/express/expressRouteAdapter";
import { makeCreateUserController } from "../../factories/controller/account/userController";
import { is } from "../../middlewares/is";

const usersRouter = Router();

const createUserController = makeCreateUserController();

usersRouter.post("/", is, adapterRoute(createUserController));

export { usersRouter };
