"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeauthorizeVehicleUseCase = void 0;
class DeauthorizeVehicleUseCase {
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }
    async execute(plate) {
        const vehicle = this.vehicleRepository.deauthorizeVehicle(plate);
        return vehicle;
    }
}
exports.DeauthorizeVehicleUseCase = DeauthorizeVehicleUseCase;
//# sourceMappingURL=DeauthorizeVehicleUseCase.js.map