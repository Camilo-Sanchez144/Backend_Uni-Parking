import { IVehicleRepository } from "../../domain/ports/IVehicle.repository";
import { Vehicle } from "../../domain/entities/Vehicle";

export class GetVehicleByPlateUseCase {
    constructor(private readonly vehicleRepository: IVehicleRepository) {}

    async execute(plate:string): Promise<Vehicle | null> {
      const vehicle = this.vehicleRepository.getVehicleByPlate(plate);
      return vehicle;
    }
}