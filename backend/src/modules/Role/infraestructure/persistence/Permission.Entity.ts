import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('Permission')
export class PermissionEntity {
  @PrimaryGeneratedColumn({type: "integer"})
  id_permission!: number;

  @Column({ type: "varchar", length: 100 })
  name_permission!: string;

  @Column({ type: "varchar", length: 100 })
  route_permission!: string;

  @Column({ type: "varchar", length: 100 })
  module_permission!: string;

  @Column({ type: "varchar", length: 200 })
  description_permission!: string;
}