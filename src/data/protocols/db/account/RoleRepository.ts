import { RoleModel } from "@/domain/models/Role";
import { CreateRoleParams } from "@/domain/useCases/account/CreateRole";

interface IRoleRepository {
  create({ name, description }: CreateRoleParams): Promise<RoleModel>;
  loadRoleByName(name: string): Promise<RoleModel | null>;
  loadRoleByIds(ids: string[]): Promise<RoleModel[]>;
}

export { IRoleRepository };
