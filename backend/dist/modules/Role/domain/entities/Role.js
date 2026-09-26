"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
class Role {
    constructor(id, name, description, permissions) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.permissions = permissions;
    }
    hasPermission(action) {
        return this.permissions.includes(action);
    }
    listPermissions() {
        return [...this.permissions];
    }
}
exports.Role = Role;
//# sourceMappingURL=Role.js.map