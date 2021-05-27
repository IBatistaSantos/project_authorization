import {
  IHasher,
  ICreateAccount,
  CreateAccountParams,
  UserModel,
  ICreateAccountRepository,
  ILoadUserByEmailRepository,
} from "./DbCreateuserProtocols";

class DbCreateUser implements ICreateAccount {
  constructor(
    private readonly hasher: IHasher,
    private readonly createAccountRepository: ICreateAccountRepository,
    private readonly loadAccountByEmailRepository: ILoadUserByEmailRepository
  ) {}

  async create(accountData: CreateAccountParams): Promise<UserModel | null> {
    const findUser = await this.loadAccountByEmailRepository.loadByEmail(
      accountData.email
    );

    if (!findUser) {
      const hashedPassword = await this.hasher.generate(accountData.password);

      const user = await this.createAccountRepository.create({
        ...accountData,
        password: hashedPassword,
      });

      return user;
    }

    return null;
  }
}

export { DbCreateUser };
