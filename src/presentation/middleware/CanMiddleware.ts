import { ICanPermissionUser } from "@/domain/useCases/authorization/ICanPermissionUser";

import { AccessDeniedError } from "../errors/AccessDeniedError";
import { forbidden, ok, serverError } from "../helpers/http";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { IMiddleware } from "../protocols/middlewares";

export class CanPermission implements IMiddleware {
  constructor(private readonly canPermission: ICanPermissionUser) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest;
      const { permission } = httpRequest.headers;
      if (!userId) {
        return forbidden(new AccessDeniedError());
      }
      const canPermission = await this.canPermission.canPermissionUser(
        permission,
        userId
      );

      if (!canPermission) {
        return forbidden(new AccessDeniedError());
      }

      return ok({ userId });
    } catch (error) {
      return serverError(error);
    }
  }
}
