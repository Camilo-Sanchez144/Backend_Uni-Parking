import { IVehicleRepository } from "../../domain/ports/IVehicle.repository";
import { Vehicle } from "../../domain/entities/Vehicle";
import { UpdateVehicleData } from "../../infraestructure/validations/UpdateVehicle.validation";
export declare class UpdateVehicleUseCase {
    private readonly vehicleRepository;
    constructor(vehicleRepository: IVehicleRepository);
    execute(plate: string, data: UpdateVehicleData): Promise<Vehicle>;
}
//# sourceMappingURL=UpdateVehicleUseCase.d.ts.map