import { IIsRoleUser } from "@/domain/useCases/authorization/IsRoleUser";

import { AccessDeniedError } from "../errors/AccessDeniedError";
import { forbidden, ok, serverError } from "../helpers/http";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { IMiddleware } from "../protocols/middlewares";

export class IsMiddleware implements IMiddleware {
  constructor(private readonly isRoleUser: IIsRoleUser) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { userId } = httpRequest;
      const { role } = httpRequest.headers;
      if (!userId) {
        return forbidden(new AccessDeniedError());
      }
      const existRoles = await this.isRoleUser.isRoleUser(role, userId);

      if (!existRoles) {
        return forbidden(new AccessDeniedError());
      }

      return ok({ userId });
    } catch (error) {
      return serverError(error);
    }
  }
}
