import { adaptMiddleware } from "../adapters/express/middlewares";
import { makeCanMiddleware } from "../factories/middlewares/canMiddleware";

export const can = adaptMiddleware(makeCanMiddleware());
