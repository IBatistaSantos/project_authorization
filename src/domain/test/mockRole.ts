import { RoleModel } from "../models/Role";
import { CreateRoleParams } from "../useCases/account/CreateRole";

export const mockCreateRoleParams = (): CreateRoleParams => ({
  name: "anyrole",
  description: "role test",
});

export const mockRoleModel = (): RoleModel => ({
  id: "anyid",
  ...mockCreateRoleParams(),
});
