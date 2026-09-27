"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllVehiclesUseCase = void 0;
class GetAllVehiclesUseCase {
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }
    async execute() {
        const vehicle = this.vehicleRepository.getAllVehicles();
        return vehicle;
    }
}
exports.GetAllVehiclesUseCase = GetAllVehiclesUseCase;
//# sourceMappingURL=GetAllVehiclesUseCase.js.map