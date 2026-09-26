"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRepository = void 0;
const Role_1 = require("../../domain/entities/Role");
const Role_entity_1 = require("../persistence/Role.entity");
class RoleRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async getRoleWithPermissions(roleId) {
        const entity = await this.dataSource.getRepository(Role_entity_1.RoleEntity).findOne({
            where: { id_role: roleId },
            relations: {
                rolePermissions: {
                    permission: true,
                },
            },
        });
        if (!entity)
            return null;
        const permissionNames = entity.rolePermissions.map((rp) => rp.permission.name_permission);
        return new Role_1.Role(entity.id_role, entity.name_role, entity.description_role, permissionNames);
    }
    async hasPermission(roleId, action) {
        const role = await this.getRoleWithPermissions(roleId);
        if (!role)
            return false;
        return role.hasPermission(action);
    }
}
exports.RoleRepository = RoleRepository;
//# sourceMappingURL=Role.repository.js.map