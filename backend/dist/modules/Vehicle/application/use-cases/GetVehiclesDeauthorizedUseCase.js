"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetVehiclesDeauthorizedUseCase = void 0;
class GetVehiclesDeauthorizedUseCase {
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }
    async execute() {
        const vehicle = this.vehicleRepository.getVehiclesDeauthorize();
        return vehicle;
    }
}
exports.GetVehiclesDeauthorizedUseCase = GetVehiclesDeauthorizedUseCase;
//# sourceMappingURL=GetVehiclesDeauthorizedUseCase.js.map