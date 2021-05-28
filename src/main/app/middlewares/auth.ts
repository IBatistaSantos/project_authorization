import { adaptMiddleware } from "../adapters/express/middlewares";
import { makeAuthMiddleware } from "../factories/middlewares/authMiddleware";

export const auth = adaptMiddleware(makeAuthMiddleware());
