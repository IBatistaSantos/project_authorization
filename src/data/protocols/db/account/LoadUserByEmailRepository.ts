import { UserModel } from "../../../../domain/models/User";

interface ILoadUserByEmailRepository {
  loadByEmail(email: string): Promise<UserModel | undefined>;
}

export { ILoadUserByEmailRepository };
