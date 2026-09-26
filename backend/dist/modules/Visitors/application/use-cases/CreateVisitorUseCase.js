"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateVisitor = void 0;
const crypto_1 = require("crypto");
const Visitor_1 = require("../../domain/entities/Visitor");
const Vehicle_1 = require("../../../Vehicle/domain/entities/Vehicle");
class CreateVisitor {
    constructor(visitorPort) {
        this.visitorPort = visitorPort;
    }
    async execute(data) {
        // El vehículo de un visitante no tiene propietario institucional y nace sin autorizar.
        const vehicle = new Vehicle_1.Vehicle((0, crypto_1.randomUUID)(), data.vehicle.plate ?? null, data.vehicle.brand ?? null, data.vehicle.model ?? null, data.vehicle.color, data.vehicle.type, false, null, data.vehicle.frame_serial ?? null);
        // El visitante también nace sin autorizar y sin salida: solo el personal de seguridad
        // lo autoriza y, después, registra su salida.
        const visitor = new Visitor_1.Visitor((0, crypto_1.randomUUID)(), data.first_name, data.last_name, data.document_type, data.document_number, data.reason, false, vehicle, new Date(), null);
        return this.visitorPort.register(visitor);
    }
}
exports.CreateVisitor = CreateVisitor;
//# sourceMappingURL=CreateVisitorUseCase.js.map