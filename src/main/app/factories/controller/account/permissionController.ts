import { CreateRoleController } from "@/presentation/controllers/account/CreateRoleController";

import { makeDbCreatePermission } from "../../useCases/permission/dbCreatePermission";

export const makeCreatePermisssionController = (): CreateRoleController => {
  const dbCreatePermission = makeDbCreatePermission();
  return new CreateRoleController(dbCreatePermission);
};
