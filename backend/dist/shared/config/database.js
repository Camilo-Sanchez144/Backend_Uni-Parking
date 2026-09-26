"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const env_1 = require("../utils/env");
const Vehicles_Entity_1 = require("../../modules/Vehicle/infraestructure/persistence/Vehicles.Entity");
const Role_entity_1 = require("../../modules/Role/infraestructure/persistence/Role.entity");
const Permission_Entity_1 = require("../../modules/Role/infraestructure/persistence/Permission.Entity");
const RolePermission_Entity_1 = require("../../modules/Role/infraestructure/persistence/RolePermission.Entity");
const User_Entity_1 = require("../../modules/User/infraestructure/persistence/User.Entity");
const Visitor_Entity_1 = require("../../modules/Visitors/infraestructure/persistence/Visitor.Entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: (0, env_1.getRequiredEnv)("DB_HOST"),
    port: Number((0, env_1.getRequiredEnv)("DB_PORT")),
    username: (0, env_1.getRequiredEnv)("DB_USERNAME"),
    password: (0, env_1.getRequiredEnv)("DB_PASSWORD"),
    database: (0, env_1.getRequiredEnv)("DB_NAME"),
    entities: [Vehicles_Entity_1.VehicleEntity, Role_entity_1.RoleEntity, Permission_Entity_1.PermissionEntity, RolePermission_Entity_1.RolePermissionEntity, User_Entity_1.UserEntity, Visitor_Entity_1.VisitorEntity],
    synchronize: true,
});
//# sourceMappingURL=database.js.map