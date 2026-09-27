import { DataSource } from "typeorm";
import { IRoleRepository } from "../../domain/ports/IRole.repository";
import { Role } from "../../domain/entities/Role";
import { RoleEntity } from "../persistence/Role.entity";

export class RoleRepository implements IRoleRepository {
  constructor(private readonly dataSource: DataSource) {}

  async getRoleWithPermissions(roleId: number): Promise<Role | null> {
    const entity = await this.dataSource.getRepository(RoleEntity).findOne({
      where: { id_role: roleId },
      relations: {
        rolePermissions: {
          permission: true,
        },
      },
    });

    if (!entity) return null;

    const permissionNames = entity.rolePermissions.map(
      (rp) => rp.permission.name_permission
    );

    return new Role(entity.id_role, entity.name_role, entity.description_role, permissionNames);
  }

  async hasPermission(roleId: number, action: string): Promise<boolean> {
    const role = await this.getRoleWithPermissions(roleId);
    if (!role) return false;
    return role.hasPermission(action);
  }
}