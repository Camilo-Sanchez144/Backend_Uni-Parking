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
exports.RoleEntity = void 0;
const typeorm_1 = require("typeorm");
const RolePermission_Entity_1 = require("./RolePermission.Entity");
let RoleEntity = class RoleEntity {
};
exports.RoleEntity = RoleEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RoleEntity.prototype, "id_role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 50 }),
    __metadata("design:type", String)
], RoleEntity.prototype, "name_role", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 200 }),
    __metadata("design:type", String)
], RoleEntity.prototype, "description_role", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => RolePermission_Entity_1.RolePermissionEntity, (rp) => rp.role),
    __metadata("design:type", Array)
], RoleEntity.prototype, "rolePermissions", void 0);
exports.RoleEntity = RoleEntity = __decorate([
    (0, typeorm_1.Entity)('Role')
], RoleEntity);
//# sourceMappingURL=Role.entity.js.map