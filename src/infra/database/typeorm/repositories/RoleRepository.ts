import {
  ICreateRoleRepository,
  ILoadRoleByNameRepository,
} from "@/data/useCases/account/createRole/DbCreateRoleProtocols";
import { RoleModel } from "@/domain/models/Role";
import { CreateRoleParams } from "@/domain/useCases/account/CreateRole";
import { getRepository, Repository } from "typeorm";

import { Role } from "../entities/Role";

class RoleRepository
  implements ICreateRoleRepository, ILoadRoleByNameRepository
{
  private readonly rolesRepository: Repository<Role>;

  constructor() {
    this.rolesRepository = getRepository(Role);
  }

  async loadRoleByName(name: string): Promise<RoleModel | null> {
    const role = await this.rolesRepository.findOne({ name });
    if (role) {
      return role;
    }

    return null;
  }

  async create({ name, description }: CreateRoleParams): Promise<RoleModel> {
    const role = this.rolesRepository.create({ name, description });
    await this.rolesRepository.save(role);

    return role;
  }
}

export { RoleRepository };
