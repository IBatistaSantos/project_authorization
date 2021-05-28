import { DbCreatePermission } from "@/data/useCases/account/createPermission/DbCreatePermission";
import { PermissionRepository } from "@/infra/database/typeorm/repositories/PermissionRepository";

export const makeDbCreatePermission = (): DbCreatePermission => {
  const permissionRepository = new PermissionRepository();
  return new DbCreatePermission(permissionRepository);
};
