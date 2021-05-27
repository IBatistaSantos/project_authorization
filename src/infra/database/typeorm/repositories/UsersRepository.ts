import { ICreateAccountRepository } from "@/data/protocols/db/account/CreateUserRepository";
import { ILoadUserByEmailRepository } from "@/data/protocols/db/account/LoadUserByEmailRepository";
import { UserModel } from "@/domain/models/User";
import { CreateAccountParams } from "@/domain/useCases/account/CreateUser";
import { getRepository, Repository } from "typeorm";

import { User } from "../entities/User";

class UsersRepository
  implements ICreateAccountRepository, ILoadUserByEmailRepository
{
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
  async loadByEmail(email: string): Promise<UserModel | undefined> {
    const user = await this.usersRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}

export { UsersRepository };
