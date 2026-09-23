import { IVehicleRepository } from "../../domain/ports/IVehicle.repository";
import { CreateVehicleData } from "../../infraestructure/validations/CreateVehicle.validation";
export declare class AddVehicleUseCase {
    private readonly vehicleRepository;
    constructor(vehicleRepository: IVehicleRepository);
    execute(data: CreateVehicleData): Promise<CreateVehicleData>;
}
//# sourceMappingURL=AddVehicleUseCase.d.ts.map