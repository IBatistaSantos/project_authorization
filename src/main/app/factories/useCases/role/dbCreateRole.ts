import { DbCreateRole } from "@/data/useCases/account/createRole/DbCreateRole";
import { RoleRepository } from "@/infra/database/typeorm/repositories/RoleRepository";

export const makeDbCreateRole = (): DbCreateRole => {
  const roleRepository = new RoleRepository();

  return new DbCreateRole(roleRepository, roleRepository);
};
