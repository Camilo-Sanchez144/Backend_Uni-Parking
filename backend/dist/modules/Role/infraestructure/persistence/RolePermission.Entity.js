"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolePermissionEntity = void 0;
const typeorm_1 = require("typeorm");
const Role_entity_1 = require("./Role.entity");
const Permission_Entity_1 = require("./Permission.Entity");
let RolePermissionEntity = class RolePermissionEntity {
};
exports.RolePermissionEntity = RolePermissionEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], RolePermissionEntity.prototype, "id_role", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], RolePermissionEntity.prototype, "id_permission", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Role_entity_1.RoleEntity, (role) => role.rolePermissions),
    (0, typeorm_1.JoinColumn)({ name: "id_role" }),
    __metadata("design:type", Role_entity_1.RoleEntity)
], RolePermissionEntity.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Permission_Entity_1.PermissionEntity),
    (0, typeorm_1.JoinColumn)({ name: "id_permission" }),
    __metadata("design:type", Permission_Entity_1.PermissionEntity)
], RolePermissionEntity.prototype, "permission", void 0);
exports.RolePermissionEntity = RolePermissionEntity = __decorate([
    (0, typeorm_1.Entity)('RolePermission')
], RolePermissionEntity);
//# sourceMappingURL=RolePermission.Entity.js.map