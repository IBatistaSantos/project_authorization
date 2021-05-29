import { IAuthentication } from "@/domain/useCases/account/IAuthenticateUser";
import { ok, serverError, unauthorized } from "@/presentation/helpers/http";
import { IController } from "@/presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http";

export class LoginController implements IController {
  constructor(private readonly authentication: IAuthentication) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body;

      const authenticationResponse = await this.authentication.auth({
        email,
        password,
      });

      if (!authenticationResponse) {
        return unauthorized();
      }

      return ok(authenticationResponse);
    } catch (error) {
      return serverError(error);
    }
  }
}
