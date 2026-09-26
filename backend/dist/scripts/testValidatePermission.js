"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const RolModule_instance_1 = require("../modules/Role/infraestructure/controllers/RolModule.instance");
const database_1 = require("../shared/config/database");
async function main() {
    await database_1.AppDataSource.initialize();
    const result = await RolModule_instance_1.validatePermissionUseCase.execute(1, "crear_vehiculo");
    console.log("¿Tiene permiso?", result);
    await database_1.AppDataSource.destroy();
}
main();
//# sourceMappingURL=testValidatePermission.js.map