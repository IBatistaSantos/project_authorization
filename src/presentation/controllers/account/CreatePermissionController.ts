import { ICreatePermission } from "@/domain/useCases/account/CreatePermission";
import { NameInUseError } from "@/presentation/errors/NameInUseError";
import { badRequest, created, serverError } from "@/presentation/helpers/http";
import { IController } from "@/presentation/protocols/controller";
import { HttpRequest, HttpResponse } from "@/presentation/protocols/http";

class CreatePermissionController implements IController {
  constructor(private readonly createPermission: ICreatePermission) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, description } = httpRequest.body;
      const permission = await this.createPermission.create({
        name,
        description,
      });

      if (!permission) {
        return badRequest(new NameInUseError());
      }
      return created({
        id: permission.id,
        name: permission.name,
        description: permission.description,
        created_at: permission.created_at,
      });
    } catch (error) {
      return serverError(error);
    }
  }
}

export { CreatePermissionController };
