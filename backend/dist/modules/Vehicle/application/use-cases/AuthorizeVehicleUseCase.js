"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizeVehicleUseCase = void 0;
class AuthorizeVehicleUseCase {
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }
    async execute(plate) {
        const vehicle = this.vehicleRepository.authorizeVehicle(plate);
        return vehicle;
    }
}
exports.AuthorizeVehicleUseCase = AuthorizeVehicleUseCase;
//# sourceMappingURL=AuthorizeVehicleUseCase.js.map