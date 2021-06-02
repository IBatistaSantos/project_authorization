import { IPermissionRepository } from "@/data/protocols/db/account/PermissionRepository";
import { IRoleRepository } from "@/data/protocols/db/account/RoleRepository";
import { PermissionModel } from "@/domain/models/Permission";
import { RoleModel } from "@/domain/models/Role";

import {
  IHasher,
  ICreateAccount,
  ICreateAccountParams,
  UserModel,
  IUserRepository,
} from "./DbCreateuserProtocols";

class DbCreateUser implements ICreateAccount {
  constructor(
    private readonly hasher: IHasher,
    private readonly usersRepository: IUserRepository,
    private readonly roleRepository: IRoleRepository,
    private readonly permissionRepository: IPermissionRepository
  ) {}

  async create({
    name,
    email,
    password,
    roles,
    permissions,
  }: ICreateAccountParams): Promise<UserModel | null> {
    let roleSave: RoleModel[] = [];
    let permissionSave: PermissionModel[] = [];
    const findUser = await this.usersRepository.loadByEmail(email);

    if (!findUser) {
      const hashedPassword = await this.hasher.generate(password);

      if (roles) {
        roleSave = await this.roleRepository.loadRoleByIds(roles);
      }

      if (permissions) {
        permissionSave = await this.permissionRepository.loadPermissionByIds(
          permissions
        );
      }

      const user = await this.usersRepository.create({
        name,
        email,
        password: hashedPassword,
        roles: roleSave,
        permissions: permissionSave,
      });

      return user;
    }

    return null;
  }
}

export { DbCreateUser };
