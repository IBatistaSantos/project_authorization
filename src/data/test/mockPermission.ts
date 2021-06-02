import { PermissionModel } from "@/domain/models/Permission";
import { mockPermissionModel } from "@/domain/test";

import { IPermissionRepository } from "../protocols/db/account/PermissionRepository";

export const mockPermissionRepository = (): IPermissionRepository => {
  class CreatePermissiobRepositoryStub implements IPermissionRepository {
    async loadPermissionByIds(): Promise<PermissionModel[]> {
      const array = new Array(mockPermissionModel());
      return array;
    }
    async loadPermissionByName(): Promise<PermissionModel | null> {
      return mockPermissionModel();
    }

    async create(): Promise<PermissionModel> {
      return mockPermissionModel();
    }
  }

  return new CreatePermissiobRepositoryStub();
};
