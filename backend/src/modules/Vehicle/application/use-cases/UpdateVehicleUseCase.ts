import { IVehicleRepository } from "../../domain/ports/IVehicle.Repository";
import { Vehicle } from "../../domain/entities/Vehicle";

export class UpdateVehicleUseCase {
    constructor(private readonly vehicleRepository: IVehicleRepository) {}

    async execute(plate:string, data: Vehicle): Promise<Vehicle> {
        const vehicle = this.vehicleRepository.updateVehicle(plate, data);
        return vehicle;
    }
}