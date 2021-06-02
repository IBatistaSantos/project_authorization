import { IUserRepository } from "@/data/protocols/db/account/UserRepository";
import { ICanPermissionUser } from "@/domain/useCases/authorization/ICanPermissionUser";

class DbCanPermissionUser implements ICanPermissionUser {
  constructor(private readonly usersRepository: IUserRepository) {}
  async canPermissionUser(
    permission: string,
    userId: string
  ): Promise<boolean> {
    const canPermission = await this.usersRepository.canPermission(
      permission,
      userId
    );
    return canPermission;
  }
}
export { DbCanPermissionUser };
