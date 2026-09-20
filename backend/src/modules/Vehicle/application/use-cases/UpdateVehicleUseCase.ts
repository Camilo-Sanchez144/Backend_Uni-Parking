import { IVehicleRepository } from "../../domain/ports/IVehicle.repository";
import { Vehicle } from "../../domain/entities/Vehicle";
import { UpdateVehicleData } from "../../infraestructure/validations/UpdateVehicle.validation";

export class UpdateVehicleUseCase {
    constructor(private readonly vehicleRepository: IVehicleRepository) {}

    async execute(plate:string, data: UpdateVehicleData): Promise<Vehicle> {
        const vehicle = this.vehicleRepository.updateVehicle(plate, data);
        return vehicle;
    }
}