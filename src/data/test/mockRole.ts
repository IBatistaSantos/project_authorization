import { RoleModel } from "@/domain/models/Role";

import { mockRoleModel } from "../../domain/test/mockRole";
import {
  ICreateRoleRepository,
  ILoadRoleByNameRepository,
} from "../useCases/account/createRole/DbCreateRoleProtocols";

export const mockCreateRoleRepository = () => {
  class CreateRoleRepositoryStub implements ICreateRoleRepository {
    async create(): Promise<RoleModel> {
      return mockRoleModel();
    }
  }

  return new CreateRoleRepositoryStub();
};

export const mockLoadRoleByNameRepository = () => {
  class LoadRoleByNameRepositoryStub implements ILoadRoleByNameRepository {
    async loadRoleByName(): Promise<RoleModel | null> {
      return mockRoleModel();
    }
  }

  return new LoadRoleByNameRepositoryStub();
};
