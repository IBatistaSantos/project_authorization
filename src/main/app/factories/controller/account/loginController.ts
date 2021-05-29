import { LoginController } from "@/presentation/controllers/account/LoginController";

import { makeDbAuthentication } from "../../useCases/user/dbAuthentication";

export const makeLoginController = (): LoginController => {
  const dbAuthentication = makeDbAuthentication();

  return new LoginController(dbAuthentication);
};
