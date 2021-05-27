import { UserModel } from "../../../../domain/models/User";
import { CreateAccountParams } from "../../../../domain/useCases/account/CreateUser";

interface ICreateAccountRepository {
  create(accountData: CreateAccountParams): Promise<UserModel>;
}

export { ICreateAccountRepository };
