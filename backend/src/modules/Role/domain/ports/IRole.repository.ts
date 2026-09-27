import { Role } from "../entities/Role";

export interface IRoleRepository {
  getRoleWithPermissions(roleId: number): Promise<Role | null>;
  hasPermission(roleId: number, action: string): Promise<boolean>;
}