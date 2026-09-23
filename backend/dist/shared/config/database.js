"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const env_1 = require("../utils/env");
const Vehicles_Entity_1 = require("../../modules/Vehicle/infraestructure/persistence/Vehicles.Entity");
const Incidents_Entity_1 = require("../../modules/Incidents/infraestructure/persistence/Incidents.Entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: (0, env_1.getRequiredEnv)("DB_HOST"),
    port: Number((0, env_1.getRequiredEnv)("DB_PORT")),
    username: (0, env_1.getRequiredEnv)("DB_USERNAME"),
    password: (0, env_1.getRequiredEnv)("DB_PASSWORD"),
    database: (0, env_1.getRequiredEnv)("DB_NAME"),
    entities: [Vehicles_Entity_1.VehicleEntity, Incidents_Entity_1.IncidentEntity],
    synchronize: true,
});
//# sourceMappingURL=database.js.map