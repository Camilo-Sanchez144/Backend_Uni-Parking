import { DataSource } from "typeorm";
import { getRequiredEnv } from "../utils/env";
import { VehicleEntity } from "../../modules/Vehicle/infraestructure/persistence/Vehicles.Entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: getRequiredEnv("DB_HOST"),
  port: Number(getRequiredEnv("DB_PORT")),
  username: getRequiredEnv("DB_USERNAME"),
  password: getRequiredEnv("DB_PASSWORD"),
  database: getRequiredEnv("DB_NAME"),
  entities: [VehicleEntity],
  synchronize: true,
});