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
exports.VisitorEntity = void 0;
const typeorm_1 = require("typeorm");
let VisitorEntity = class VisitorEntity {
};
exports.VisitorEntity = VisitorEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ type: "uuid" }),
    __metadata("design:type", String)
], VisitorEntity.prototype, "id_visitor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 40 }),
    __metadata("design:type", String)
], VisitorEntity.prototype, "first_name_visitor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 40 }),
    __metadata("design:type", String)
], VisitorEntity.prototype, "last_name_visitor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 10 }),
    __metadata("design:type", String)
], VisitorEntity.prototype, "document_type_visitor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 20 }),
    __metadata("design:type", String)
], VisitorEntity.prototype, "document_number_visitor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 160 }),
    __metadata("design:type", String)
], VisitorEntity.prototype, "reason_visitor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "uuid" }),
    __metadata("design:type", String)
], VisitorEntity.prototype, "plate_vehicle_visitor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], VisitorEntity.prototype, "brand_vehicle", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "integer" }),
    __metadata("design:type", Number)
], VisitorEntity.prototype, "model_vehicle", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], VisitorEntity.prototype, "color_vehicle", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar" }),
    __metadata("design:type", String)
], VisitorEntity.prototype, "type_vehicle", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamptz" }),
    __metadata("design:type", Date)
], VisitorEntity.prototype, "created_at_visitor", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamptz", nullable: true }),
    __metadata("design:type", Object)
], VisitorEntity.prototype, "exited_at_visitor", void 0);
exports.VisitorEntity = VisitorEntity = __decorate([
    (0, typeorm_1.Entity)('Visitor')
], VisitorEntity);
//# sourceMappingURL=Visitor.Entity.js.map