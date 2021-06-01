import { ICreateAccount } from "@/domain/useCases/account/CreateUser";
import { EmailInUseError } from "@/presentation/errors/EmailInUseError";
import { badRequest, created, serverError } from "@/presentation/helpers/http";
import {
  IController,
  HttpRequest,
  HttpResponse,
} from "@/presentation/protocols";

class CreateUserController implements IController {
  constructor(private readonly createUser: ICreateAccount) {}
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, password, roles } = httpRequest.body;
      const user = await this.createUser.create({
        email,
        name,
        password,
        roles,
      });

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
