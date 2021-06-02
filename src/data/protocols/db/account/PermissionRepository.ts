import { PermissionModel } from "@/domain/models/Permission";
import { CreatePermissionParams } from "@/domain/useCases/account/CreatePermission";

interface IPermissionRepository {
  loadPermissionByIds(ids: string[]): Promise<PermissionModel[]>;
  create({
    name,
    description,
  }: CreatePermissionParams): Promise<PermissionModel>;
  loadPermissionByName(name: string): Promise<PermissionModel | null>;
}

export { IPermissionRepository };
