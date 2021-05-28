import { RoleModel } from "@/domain/models/Role";

interface ILoadRoleByNameRepository {
  loadRoleByName(name: string): Promise<RoleModel | null>;
}

export { ILoadRoleByNameRepository };
