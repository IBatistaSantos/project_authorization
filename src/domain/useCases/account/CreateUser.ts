import { UserModel } from "../../models/User";

interface ICreateAccountParams {
  name: string;
  email: string;
  password: string;
  roles?: string[];
}

interface ICreateAccount {
  create(account: ICreateAccountParams): Promise<UserModel | null>;
}

export { ICreateAccount, ICreateAccountParams };
