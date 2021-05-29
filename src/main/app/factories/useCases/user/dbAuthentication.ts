import { DbAuthentication } from "@/data/useCases/account/authenticateUser/DbAuthenticatedUser";
import { BcryptAdapter } from "@/infra/crypto/bcryptAdapter/BcryptAdapter";
import { JwtAdapter } from "@/infra/crypto/jwtAdapter/JwtAdapter";
import { UsersRepository } from "@/infra/database/typeorm/repositories/UsersRepository";
import authConfig from "@/main/config/auth";

export const makeDbAuthentication = (): DbAuthentication => {
  const salt = 12;

  const usersRepository = new UsersRepository();
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(authConfig.secret);

  return new DbAuthentication(usersRepository, bcryptAdapter, jwtAdapter);
};
