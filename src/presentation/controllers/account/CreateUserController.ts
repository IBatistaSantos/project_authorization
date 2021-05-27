import { ICreateAccount } from "@/domain/useCases/account/CreateUser";
import { EmailInUseError } from "@/presentation/errors/EmailInUseError";
import { badRequest, created, serverError } from "@/presentation/helpers/http";
import {
  Controller,
  HttpRequest,
  HttpResponse,
} from "@/presentation/protocols";

class CreateUserController implements Controller {
  constructor(private readonly createUser: ICreateAccount) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, password } = httpRequest.body;
      const user = await this.createUser.create({ email, name, password });

      if (!user) {
        return badRequest(new EmailInUseError());
      }

      return created(user);
    } catch (error) {
      return serverError(error);
    }
  }
}

export { CreateUserController };
