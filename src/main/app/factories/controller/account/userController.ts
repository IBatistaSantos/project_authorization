import { CreateUserController } from "@/presentation/controllers/account/CreateUserController";

import { makeDbCreateUser } from "../../useCases/user/dbCreateUser";

export const makeCreateUserController = (): CreateUserController => {
  const dbCreateUser = makeDbCreateUser();
  return new CreateUserController(dbCreateUser);
};
