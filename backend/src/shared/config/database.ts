import { DataSource } from "typeorm";
import { getRequiredEnv } from "../utils/env";
import { VehicleEntity } from "../../modules/Vehicle/infraestructure/persistence/Vehicles.Entity";
import { IncidentEntity } from "../../modules/Incidents/infraestructure/persistence/Incidents.Entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: getRequiredEnv("DB_HOST"),
  port: Number(getRequiredEnv("DB_PORT")),
  username: getRequiredEnv("DB_USERNAME"),
  password: getRequiredEnv("DB_PASSWORD"),
  database: getRequiredEnv("DB_NAME"),
  entities: [VehicleEntity, IncidentEntity],
  synchronize: true,
});