import {
  IHasher,
  ICreateAccount,
  CreateAccountParams,
  UserModel,
  IUserRepository,
} from "./DbCreateuserProtocols";

class DbCreateUser implements ICreateAccount {
  constructor(
    private readonly hasher: IHasher,
    private readonly usersRepository: IUserRepository
  ) {}

  async create({
    name,
    email,
    password,
    permissions,
    roles,
  }: CreateAccountParams): Promise<UserModel | null> {
    const findUser = await this.usersRepository.loadByEmail(email);

    if (!findUser) {
      const hashedPassword = await this.hasher.generate(password);

      const user = await this.usersRepository.create({
        name,
        email,
        password: hashedPassword,
        permissions,
        roles,
      });

      return user;
    }

    return null;
  }
}

export { DbCreateUser };
