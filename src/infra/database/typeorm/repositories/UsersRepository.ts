import {
  ICreateUser,
  IUserRepository,
} from "@/data/protocols/db/account/UserRepository";
import { UserModel } from "@/domain/models/User";
import { getRepository, Repository } from "typeorm";

import { User } from "../entities/User";

class UsersRepository implements IUserRepository {
  private readonly usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getRepository(User);
  }

  async create({
    name,
    email,
    password,
    roles,
    permissions,
  }: ICreateUser): Promise<UserModel> {
    const user = this.usersRepository.create({ name, email, password });

    if (roles) {
      user.roles = roles;
    }

    if (permissions) {
      user.permissions = permissions;
    }

    await this.usersRepository.save(user);
    return user;
  }
  async loadByEmail(email: string): Promise<UserModel | null> {
    const findUser = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    if (findUser) {
      return findUser;
    }

    return null;
  }

  async is(role: string, userId: string): Promise<boolean> {
    const roleName = role;
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ["roles"],
    });

    if (!user) {
      return false;
    }

    const existsRoles = user.roles.find((role) => role.name === roleName);

    if (existsRoles) {
      return true;
    }
    return false;
  }

  async canPermission(permission: string, userId: string): Promise<boolean> {
    const canPermission = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ["permissions"],
    });

    if (!canPermission) {
      return false;
    }

    const existsPermission = canPermission.permissions.find(
      (pName) => pName.name === permission
    );
    if (existsPermission) {
      return true;
    }
    return false;
  }
}
export { UsersRepository };
