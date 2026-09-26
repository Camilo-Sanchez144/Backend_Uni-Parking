import { IVehicleRepository } from "../../domain/ports/IVehicle.repository";
export declare class DeauthorizeVehicleUseCase {
    private readonly vehicleRepository;
    constructor(vehicleRepository: IVehicleRepository);
    execute(plate: string): Promise<void>;
}
//# sourceMappingURL=DeauthorizeVehicleUseCase.d.ts.map