import { IVehicleRepository } from "../../domain/ports/IVehicle.repository";
import { Vehicle } from "../../domain/entities/Vehicle";
export declare class GetVehicleByPlateUseCase {
    private readonly vehicleRepository;
    constructor(vehicleRepository: IVehicleRepository);
    execute(plate: string): Promise<Vehicle | null>;
}
//# sourceMappingURL=GetVehicleByPlateUseCase.d.ts.map