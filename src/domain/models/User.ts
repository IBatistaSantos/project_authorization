import { PermissionModel } from "@/data/useCases/account/createPermission/DbCreatePermissionProtocols";

import { RoleModel } from "./Role";

export type UserModel = {
  id: string;
  name: string;
  email: string;
  password: string;
  permissions?: PermissionModel[];
  roles?: RoleModel[];
};
