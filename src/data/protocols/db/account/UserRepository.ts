import { RoleModel } from "@/domain/models/Role";

import { UserModel } from "../../../../domain/models/User";

interface ICreateUser {
  name: string;
  email: string;
  password: string;
  roles?: RoleModel[];
}

interface IUserRepository {
  create(accountData: ICreateUser): Promise<UserModel>;
  loadByEmail(email: string): Promise<UserModel | null>;
}

export { IUserRepository, ICreateUser };
