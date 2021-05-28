import { AuthMiddleware } from "@/presentation/middleware/AuthMiddleware";
import { IMiddleware } from "@/presentation/protocols/middlewares";

import { makeDecryptUserIdByToken } from "../useCases/user/decryptUserIdByToken";

export const makeAuthMiddleware = (): IMiddleware => {
  const decryptUserIdByToken = makeDecryptUserIdByToken();

  return new AuthMiddleware(decryptUserIdByToken);
};
