"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(id, name, email, roleId, vehicles, status_user = true) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.roleId = roleId;
        this.vehicles = vehicles;
        this.status_user = status_user;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map