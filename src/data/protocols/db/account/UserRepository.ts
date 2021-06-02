import { PermissionModel } from "@/domain/models/Permission";
import { RoleModel } from "@/domain/models/Role";

import { UserModel } from "../../../../domain/models/User";

interface ICreateUser {
  name: string;
  email: string;
  password: string;
  roles?: RoleModel[];
  permissions?: PermissionModel[];
}

interface IUserRepository {
  canPermission(permission: string, userId: string): Promise<boolean>;
  create(accountData: ICreateUser): Promise<UserModel>;
  loadByEmail(email: string): Promise<UserModel | null>;
  is(role: string, userId: string): Promise<boolean>;
}

export { IUserRepository, ICreateUser };
