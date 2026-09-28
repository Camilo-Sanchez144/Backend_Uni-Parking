import { DataSource } from "typeorm";
import { getRequiredEnv } from "../utils/env";
import { IncidentEntity } from "../../modules/Incidents/infraestructure/persistence/Incidents.Entity";
import { PermissionEntity } from "../../modules/Role/infraestructure/persistence/Permission.Entity";
import { RoleEntity } from "../../modules/Role/infraestructure/persistence/Role.entity";
import { RolePermissionEntity } from "../../modules/Role/infraestructure/persistence/RolePermission.Entity";
import { UserEntity } from "../../modules/User/infraestructure/persistence/User.Entity";
import { VehicleEntity } from "../../modules/Vehicle/infraestructure/persistence/Vehicles.Entity";
import { VisitorEntity } from "../../modules/Visitors/infraestructure/persistence/Visitor.Entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: getRequiredEnv("DB_HOST"),
  port: Number(getRequiredEnv("DB_PORT")),
  username: getRequiredEnv("DB_USERNAME"),
  password: getRequiredEnv("DB_PASSWORD"),
  database: getRequiredEnv("DB_NAME"),
  entities: [
    IncidentEntity,
    PermissionEntity,
    RoleEntity,
    RolePermissionEntity,
    UserEntity,
    VehicleEntity,
    VisitorEntity,
  ],
  synchronize: process.env.NODE_ENV !== "production",
});