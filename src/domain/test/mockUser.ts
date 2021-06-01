import { UserModel } from "../models/User";
import { ICreateAccountParams } from "../useCases/account/CreateUser";

export const mockCreateAccountParams = (): ICreateAccountParams => ({
  name: "anyname",
  email: "anymail@mail.com",
  password: "anypassword",
});

export const mockUserModel = (): UserModel => ({
  id: "anyid",
  ...mockCreateAccountParams(),
});
