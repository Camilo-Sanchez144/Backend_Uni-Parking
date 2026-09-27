import { IVehicleRepository } from "../../domain/ports/IVehicle.repository";
export declare class AuthorizeVehicleUseCase {
    private readonly vehicleRepository;
    constructor(vehicleRepository: IVehicleRepository);
    execute(plate: string): Promise<void>;
}
//# sourceMappingURL=AuthorizeVehicleUseCase.d.ts.map