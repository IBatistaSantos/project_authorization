import { ILoadUserIdByToken } from "@/domain/useCases/account/LoadUserIdByToken";

import { AccessDeniedError } from "../errors/AccessDeniedError";
import { forbidden, ok, serverError } from "../helpers/http";
import { HttpRequest, HttpResponse } from "../protocols/http";
import { IMiddleware } from "../protocols/middlewares";

export class AuthMiddleware implements IMiddleware {
  constructor(private readonly loadUserIdByToken: ILoadUserIdByToken) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.authorization;

      if (!accessToken) {
        return forbidden(new AccessDeniedError());
      }

      const [, token] = accessToken.split(" ");

      const userId = await this.loadUserIdByToken.loadUserId(token);

      if (!userId) {
        return forbidden(new AccessDeniedError());
      }

      return ok({ userId });
    } catch (error) {
      return serverError(error);
    }
  }
}
