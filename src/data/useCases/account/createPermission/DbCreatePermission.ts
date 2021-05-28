import {
  CreatePermissionParams,
  ICreatePermission,
} from "@/domain/useCases/account/CreatePermission";

import {
  IPermissionRepository,
  PermissionModel,
} from "./DbCreatePermissionProtocols";

class DbCreatePermission implements ICreatePermission {
  constructor(private permissionRepository: IPermissionRepository) {}

  async create({
    name,
    description,
  }: CreatePermissionParams): Promise<PermissionModel | null> {
    const findPermission = await this.permissionRepository.loadPermissionByName(
      name
    );

    if (!findPermission) {
      const permission = await this.permissionRepository.create({
        name,
        description,
      });
      return permission;
    }

    return null;
  }
}

export { DbCreatePermission };
