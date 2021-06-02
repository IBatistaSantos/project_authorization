import { CanPermission } from "@/presentation/middleware/CanMiddleware";
import { IMiddleware } from "@/presentation/protocols/middlewares";

import { makeCanPermissionUser } from "../useCases/user/canPermissionUser";

export const makeCanMiddleware = (): IMiddleware => {
  const canMiddleware = makeCanPermissionUser();
  return new CanPermission(canMiddleware);
};
