import { IsMiddleware } from "@/presentation/middleware/IsMiddleware";
import { IMiddleware } from "@/presentation/protocols/middlewares";

import { makeIsMiddleware as makeIsMiddlewareUseCase } from "../useCases/user/isRoleUser";

export const makeIsMiddleware = (): IMiddleware => {
  const isMiddleware = makeIsMiddlewareUseCase();
  return new IsMiddleware(isMiddleware);
};
