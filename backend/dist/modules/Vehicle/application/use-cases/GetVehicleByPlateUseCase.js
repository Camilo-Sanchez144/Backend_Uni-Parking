"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetVehicleByPlateUseCase = void 0;
class GetVehicleByPlateUseCase {
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }
    async execute(plate) {
        const vehicle = this.vehicleRepository.getVehicleByPlate(plate);
        return vehicle;
    }
}
exports.GetVehicleByPlateUseCase = GetVehicleByPlateUseCase;
//# sourceMappingURL=GetVehicleByPlateUseCase.js.map