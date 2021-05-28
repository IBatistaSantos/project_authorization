import { ICreateRoleRepository } from "@/data/protocols/db/account/role/CreateRoleRepository";
import { ILoadRoleByNameRepository } from "@/data/protocols/db/account/role/LoadRoleByNameRepository";
import { RoleModel } from "@/domain/models/Role";
import {
  CreateRoleParams,
  ICreateRole,
} from "@/domain/useCases/account/CreateRole";

class DbCreateRole implements ICreateRole {
  constructor(
    private readonly loadRoleByName: ILoadRoleByNameRepository,
    private readonly createRoleRepository: ICreateRoleRepository
  ) {}
  async create({
    name,
    description,
  }: CreateRoleParams): Promise<RoleModel | null> {
    const findRole = await this.loadRoleByName.loadRoleByName(name);

    if (findRole) {
      return null;
    }

    const role = await this.createRoleRepository.create({
      name,
      description,
    });
    return role;
  }
}

export { DbCreateRole };
