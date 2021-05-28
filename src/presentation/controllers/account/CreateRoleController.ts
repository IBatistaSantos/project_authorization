import { ICreateRole } from "@/domain/useCases/account/CreateRole";
import { NameInUseError } from "@/presentation/errors/NameInUseError";
import { badRequest, created, serverError } from "@/presentation/helpers/http";
import { IController } from "@/presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http";

class CreateRoleController implements IController {
  constructor(private readonly createRole: ICreateRole) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, description } = httpRequest.body;
      const role = await this.createRole.create({ name, description });
      if (!role) {
        return badRequest(new NameInUseError());
      }

      return created({
        id: role.id,
        name: role.name,
        description: role.description,
      });
    } catch (error) {
      return serverError(error);
    }
  }
}

export { CreateRoleController };
