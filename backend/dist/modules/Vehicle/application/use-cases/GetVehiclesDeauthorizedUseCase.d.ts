import { IVehicleRepository } from "../../domain/ports/IVehicle.repository";
import { Vehicle } from "../../domain/entities/Vehicle";
export declare class GetVehiclesDeauthorizedUseCase {
    private readonly vehicleRepository;
    constructor(vehicleRepository: IVehicleRepository);
    execute(): Promise<Vehicle[]>;
}
//# sourceMappingURL=GetVehiclesDeauthorizedUseCase.d.ts.map