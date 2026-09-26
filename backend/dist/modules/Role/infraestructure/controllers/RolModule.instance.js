"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePermissionUseCase = void 0;
const database_1 = require("../../../../shared/config/database");
const Role_repository_1 = require("../adapters/Role.repository");
const ValidatePermissionUseCase_1 = require("../../application/use-cases/ValidatePermissionUseCase");
const roleRepository = new Role_repository_1.RoleRepository(database_1.AppDataSource);
exports.validatePermissionUseCase = new ValidatePermissionUseCase_1.ValidatePermissionUseCase(roleRepository);
//# sourceMappingURL=RolModule.instance.js.map