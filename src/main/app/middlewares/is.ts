import { adaptMiddleware } from "../adapters/express/middlewares";
import { makeIsMiddleware } from "../factories/middlewares/isMiddleware";

export const is = adaptMiddleware(makeIsMiddleware());
