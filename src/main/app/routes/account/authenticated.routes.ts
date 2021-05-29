import { Router } from "express";

import { adapterRoute } from "../../adapters/express/expressRouteAdapter";
import { makeLoginController } from "../../factories/controller/account/loginController";

const loginRouter = Router();

const loginController = makeLoginController();

loginRouter.post("/", adapterRoute(loginController));

export { loginRouter };
