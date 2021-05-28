import { CreateRoleController } from "@/presentation/controllers/account/CreateRoleController";

import { makeDbCreateRole } from "../../useCases/role/dbCreateRole";

export const makeCreateRoleController = (): CreateRoleController => {
  const dbCreateUser = makeDbCreateRole();
  return new CreateRoleController(dbCreateUser);
};
