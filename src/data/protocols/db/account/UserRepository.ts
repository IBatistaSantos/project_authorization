import { UserModel } from "../../../../domain/models/User";
import { CreateAccountParams } from "../../../../domain/useCases/account/CreateUser";

interface IUserRepository {
  create(accountData: CreateAccountParams): Promise<UserModel>;
  loadByEmail(email: string): Promise<UserModel | null>;
}

export { IUserRepository };
