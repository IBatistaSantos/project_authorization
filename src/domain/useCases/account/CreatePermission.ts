import { PermissionModel } from "@/domain/models/Permission";

type CreatePermissionParams = Omit<PermissionModel, "id">;

interface ICreatePermission {
  create({
    name,
    description,
  }: CreatePermissionParams): Promise<PermissionModel | null>;
}

export { ICreatePermission, CreatePermissionParams };
