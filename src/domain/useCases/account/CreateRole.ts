import { RoleModel } from "@/domain/models/Role";

type CreateRoleParams = Omit<RoleModel, "id">;

interface ICreateRole {
  create(role: CreateRoleParams): Promise<RoleModel | null>;
}

export { ICreateRole, CreateRoleParams };
