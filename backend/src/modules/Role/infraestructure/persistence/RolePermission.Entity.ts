import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { RoleEntity } from "./Role.entity";
import { PermissionEntity } from "./Permission.Entity";

@Entity('RolePermission')
export class RolePermissionEntity {
  @PrimaryColumn()
  id_role!: number;

  @PrimaryColumn()
  id_permission!: string;

  @ManyToOne(() => RoleEntity, (role) => role.rolePermissions)
  @JoinColumn({ name: "id_role" })
  role!: RoleEntity;

  @ManyToOne(() => PermissionEntity)
  @JoinColumn({ name: "id_permission" })
  permission!: PermissionEntity;
}