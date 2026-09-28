import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { RoleEntity } from "./Role.entity";
import { PermissionEntity } from "./Permission.Entity";

@Entity("RolePermission")
export class RolePermissionEntity {
  @PrimaryColumn({ type: "integer" })
  id_role!: number;

  @PrimaryColumn({ type: "integer" })
  id_permission!: number;

  @ManyToOne(() => RoleEntity, (role) => role.rolePermissions, { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_role" })
  role!: RoleEntity;

  @ManyToOne(() => PermissionEntity, { onDelete: "CASCADE" })
  @JoinColumn({ name: "id_permission" })
  permission!: PermissionEntity;
}