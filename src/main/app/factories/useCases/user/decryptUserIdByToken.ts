import { DecryptUserIdByToken } from "@/data/useCases/account/createuser/crypto/DecryptUserIdByToken";
import { JwtAdapter } from "@/infra/crypto/jwtAdapter/JwtAdapter";
import authConfig from "@/main/config/auth";

export const makeDecryptUserIdByToken = (): DecryptUserIdByToken => {
  const jwtAdapter = new JwtAdapter(authConfig.secret);
  return new DecryptUserIdByToken(jwtAdapter);
};
