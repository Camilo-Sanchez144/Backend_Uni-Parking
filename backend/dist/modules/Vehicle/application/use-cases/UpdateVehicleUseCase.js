"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVehicleUseCase = void 0;
class UpdateVehicleUseCase {
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }
    async execute(plate, data) {
        const vehicle = this.vehicleRepository.updateVehicle(plate, data);
        return vehicle;
    }
}
exports.UpdateVehicleUseCase = UpdateVehicleUseCase;
//# sourceMappingURL=UpdateVehicleUseCase.js.map