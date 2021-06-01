import { IRoleRepository } from "@/data/protocols/db/account/RoleRepository";
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
    private readonly roleRepository: IRoleRepository
  ) {}

  async create({
    name,
    email,
    password,
    roles,
  }: ICreateAccountParams): Promise<UserModel | null> {
    const findUser = await this.usersRepository.loadByEmail(email);
    let roleSave: RoleModel[] = [];
    if (!findUser) {
      const hashedPassword = await this.hasher.generate(password);

      if (roles) {
        roleSave = await this.roleRepository.loadRoleByIds(roles);
      }
      const user = await this.usersRepository.create({
        name,
        email,
        password: hashedPassword,
        roles: roleSave,
      });

      return user;
    }

    return null;
  }
}

export { DbCreateUser };
