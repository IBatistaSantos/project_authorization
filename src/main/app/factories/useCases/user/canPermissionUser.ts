import { DbCanPermissionUser } from "@/data/useCases/authorization/canPermissionUser";
import { UsersRepository } from "@/infra/database/typeorm/repositories/UsersRepository";

export const makeCanPermissionUser = (): DbCanPermissionUser => {
  const userRepository = new UsersRepository();
  return new DbCanPermissionUser(userRepository);
};
