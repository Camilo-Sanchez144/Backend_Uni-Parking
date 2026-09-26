import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RolePermissionEntity } from "./RolePermission.Entity";

@Entity('Role')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id_role!: number;

  @Column({ type: "varchar", length: 50 })
  name_role!: string;

  @Column({ type: "varchar", length: 200 })
  description_role!: string;

  @OneToMany(() => RolePermissionEntity, (rp) => rp.role)
  rolePermissions!: RolePermissionEntity[];
}