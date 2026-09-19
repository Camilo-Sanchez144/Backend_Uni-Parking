import { IVehicleRepository } from "../../domain/ports/IVehicle.Repository";
import { Vehicle } from "../../domain/entities/Vehicle";

export class AddVehicleUseCase {
    constructor(private readonly vehicleRepository: IVehicleRepository) {}

    async execute(data:Vehicle): Promise<Vehicle> {
      const vehicle = this.vehicleRepository.addVehicle(data);
      return vehicle;
    }
}