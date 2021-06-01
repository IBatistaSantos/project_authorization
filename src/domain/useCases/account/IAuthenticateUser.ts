import { UserModel } from "@/domain/models/User";

export type AuthenticationParams = {
  email: string;
  password: string;
};

export type AuthenticationResponse = {
  user: UserModel;
  token: string;
};

export interface IAuthentication {
  auth(data: AuthenticationParams): Promise<AuthenticationResponse | null>;
}
