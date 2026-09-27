import { IVehicleRepository } from "../../domain/ports/IVehicle.repository";
import { Vehicle } from "../../domain/entities/Vehicle";
export declare class GetAllVehiclesUseCase {
    private readonly vehicleRepository;
    constructor(vehicleRepository: IVehicleRepository);
    execute(): Promise<Vehicle[]>;
}
//# sourceMappingURL=GetAllVehiclesUseCase.d.ts.map