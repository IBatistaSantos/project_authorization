import { DbCreateUser } from "@/data/useCases/account/createuser/DbCreateUser";
import { BcryptAdapter } from "@/infra/crypto/bcryptAdapter/BcryptAdapter";
import { PermissionRepository } from "@/infra/database/typeorm/repositories/PermissionRepository";
import { RoleRepository } from "@/infra/database/typeorm/repositories/RoleRepository";
import { UsersRepository } from "@/infra/database/typeorm/repositories/UsersRepository";

export const makeDbCreateUser = (): DbCreateUser => {
  const userRepository = new UsersRepository();
  const roleRepository = new RoleRepository();
  const permissionRepository = new PermissionRepository();
  const bcrypt = new BcryptAdapter(8);
  return new DbCreateUser(
    bcrypt,
    userRepository,
    roleRepository,
    permissionRepository
  );
};
