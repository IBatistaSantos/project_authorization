import { IEncrypter } from "@/data/protocols/crypto/Encrypter";
import { IHashComparer } from "@/data/protocols/crypto/HashComparer";
import { IUserRepository } from "@/data/protocols/db/account/UserRepository";
import {
  IAuthentication,
  AuthenticationParams,
  AuthenticationResponse,
} from "@/domain/useCases/account/IAuthenticateUser";

export class DbAuthentication implements IAuthentication {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter
  ) {}

  async auth(
    data: AuthenticationParams
  ): Promise<AuthenticationResponse | null> {
    const { email, password } = data;

    const user = await this.userRepository.loadByEmail(email);

    if (user && (await this.hashComparer.compare(password, user.password))) {
      const { id } = user;

      const token = await this.encrypter.encrypt(id);

      return { user, token };
    }

    return null;
  }
}
