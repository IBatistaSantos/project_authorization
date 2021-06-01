import { RoleModel } from "@/domain/models/Role";

import { mockRoleModel } from "../../domain/test/mockRole";
import { IRoleRepository } from "../useCases/account/createRole/DbCreateRoleProtocols";

export const mockRoleRepository = (): IRoleRepository => {
  class CreateRoleRepositoryStub implements IRoleRepository {
    async loadRoleByName(): Promise<RoleModel | null> {
      return mockRoleModel();
    }
    async create(): Promise<RoleModel> {
      return mockRoleModel();
    }

    async loadRoleByIds(): Promise<RoleModel[]> {
      const array = new Array(mockRoleModel());
      return array;
    }
  }

  return new CreateRoleRepositoryStub();
};
