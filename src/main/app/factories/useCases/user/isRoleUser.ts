import { DbIsRoleUser } from "@/data/useCases/authorization/IsRoleUser";
import { UsersRepository } from "@/infra/database/typeorm/repositories/UsersRepository";

export const makeIsMiddleware = (): DbIsRoleUser => {
  const userRepository = new UsersRepository();
  return new DbIsRoleUser(userRepository);
};
