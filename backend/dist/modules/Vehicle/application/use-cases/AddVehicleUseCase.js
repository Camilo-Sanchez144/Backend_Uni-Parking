"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddVehicleUseCase = void 0;
const Vehicle_1 = require("../../domain/entities/Vehicle");
class AddVehicleUseCase {
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }
    async execute(data) {
        const vehicle = new Vehicle_1.Vehicle(data.plate, data.brand, data.model, data.color, data.type, false, data.id_owner);
        return this.vehicleRepository.addVehicle(vehicle);
    }
}
exports.AddVehicleUseCase = AddVehicleUseCase;
//# sourceMappingURL=AddVehicleUseCase.js.map