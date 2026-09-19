import { IVehicleRepository } from "../../domain/ports/IVehicle.Repository";

export class DeauthorizeVehicleUseCase {
    constructor(private readonly vehicleRepository: IVehicleRepository) {}

    async execute(plate:string): Promise<void> {
      const vehicle = this.vehicleRepository.deauthorizeVehicle(plate);
      return vehicle;
    }
}