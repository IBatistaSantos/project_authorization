import { IRoleRepository } from "@/data/protocols/db/account/RoleRepository";
import { RoleModel } from "@/domain/models/Role";
import {
  CreateRoleParams,
  ICreateRole,
} from "@/domain/useCases/account/CreateRole";

class DbCreateRole implements ICreateRole {
  constructor(private readonly rolesRepository: IRoleRepository) {}
  async create({
    name,
    description,
  }: CreateRoleParams): Promise<RoleModel | null> {
    const findRole = await this.rolesRepository.loadRoleByName(name);

    if (findRole) {
      return null;
    }

    const role = await this.rolesRepository.create({
      name,
      description,
    });
    return role;
  }
}

export { DbCreateRole };
