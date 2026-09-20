import { IVehicleRepository } from "../../domain/ports/IVehicle.repository";
import { Vehicle } from "../../domain/entities/Vehicle";

export class GetAllVehiclesUseCase {
    constructor(private readonly vehicleRepository: IVehicleRepository) {}

    async execute(): Promise<Vehicle[]> {
      const vehicle = this.vehicleRepository.getAllVehicles();
      return vehicle;
    }
}