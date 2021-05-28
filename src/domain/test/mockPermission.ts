import { PermissionModel } from "../models/Permission";
import { CreatePermissionParams } from "../useCases/account/CreatePermission";

export const mockCreatePermissionParams = (): CreatePermissionParams => ({
  name: "anypermission",
  description: "permission test",
});

export const mockPermissionModel = (): PermissionModel => ({
  id: "anyid",
  ...mockCreatePermissionParams(),
});
