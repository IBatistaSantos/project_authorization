import { UserModel } from "../models/User";
import { CreateAccountParams } from "../useCases/account/CreateUser";

export const mockCreateAccountParams = (): CreateAccountParams => ({
  name: "anyname",
  email: "anymail@mail.com",
  password: "anypassword",
});

export const mockUserModel = (): UserModel => ({
  id: "anyid",
  ...mockCreateAccountParams(),
});
