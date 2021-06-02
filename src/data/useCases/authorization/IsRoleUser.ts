import { IUserRepository } from "@/data/protocols/db/account/UserRepository";
import { IIsRoleUser } from "@/domain/useCases/authorization/IsRoleUser";

class DbIsRoleUser implements IIsRoleUser {
  constructor(private readonly usersRepository: IUserRepository) {}

  async isRoleUser(roleName: string, userId: string): Promise<boolean> {
    const is = await this.usersRepository.is(roleName, userId);
    return is;
  }
}
export { DbIsRoleUser };
