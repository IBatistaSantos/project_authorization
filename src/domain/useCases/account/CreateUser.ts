import { UserModel } from "../../models/User";

type CreateAccountParams = Omit<UserModel, "id">;

interface ICreateAccount {
  create(account: CreateAccountParams): Promise<UserModel | null>;
}

export { ICreateAccount, CreateAccountParams };
