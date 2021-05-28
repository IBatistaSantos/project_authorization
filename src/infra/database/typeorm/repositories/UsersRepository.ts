import { IUserRepository } from "@/data/protocols/db/account/UserRepository";
import { UserModel } from "@/domain/models/User";
import { CreateAccountParams } from "@/domain/useCases/account/CreateUser";
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
  }: CreateAccountParams): Promise<UserModel> {
    const user = this.usersRepository.create({ name, email, password });
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
}

export { UsersRepository };
