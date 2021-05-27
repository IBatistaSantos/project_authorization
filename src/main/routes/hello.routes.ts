import { Router } from "express";

import { adapterRoute } from "../adapters/express/expressRouteAdapter";
import { makeHelloController } from "../factories/controller/HelloControllerFactory";

export default (router: Router): void => {
  router.get("/hello", adapterRoute(makeHelloController()));
};
