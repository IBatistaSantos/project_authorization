import { IPermissionRepository } from "@/data/protocols/db/account/PermissionRepository";
import { PermissionModel } from "@/domain/models/Permission";
import { CreatePermissionParams } from "@/domain/useCases/account/CreatePermission";
import { getRepository, Repository } from "typeorm";

import { Permission } from "../entities/Permission";

class PermissionRepository implements IPermissionRepository {
  private readonly permissionRepository: Repository<Permission>;

  constructor() {
    this.permissionRepository = getRepository(Permission);
  }
  async loadPermissionByIds(ids: string[]): Promise<PermissionModel[]> {
    const permissions = await this.permissionRepository.findByIds(ids);
    return permissions;
  }

  async loadPermissionByName(name: string): Promise<PermissionModel | null> {
    const permission = await this.permissionRepository.findOne({ name });

    if (permission) {
      return permission;
    }

    return null;
  }

  async create({
    name,
    description,
  }: CreatePermissionParams): Promise<PermissionModel> {
    const permission = this.permissionRepository.create({ name, description });
    await this.permissionRepository.save(permission);

    return permission;
  }
}

export { PermissionRepository };
