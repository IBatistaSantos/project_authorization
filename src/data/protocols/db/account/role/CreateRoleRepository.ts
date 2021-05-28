import { RoleModel } from "@/domain/models/Role";
import { CreateRoleParams } from "@/domain/useCases/account/CreateRole";

interface ICreateRoleRepository {
  create({ name, description }: CreateRoleParams): Promise<RoleModel>;
}

export { ICreateRoleRepository };
