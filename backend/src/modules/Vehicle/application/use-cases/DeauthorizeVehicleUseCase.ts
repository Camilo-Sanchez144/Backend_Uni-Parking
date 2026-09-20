import { IVehicleRepository } from "../../domain/ports/IVehicle.repository";

export class DeauthorizeVehicleUseCase {
    constructor(private readonly vehicleRepository: IVehicleRepository) {}

    async execute(plate:string): Promise<void> {
      const vehicle = this.vehicleRepository.deauthorizeVehicle(plate);
      return vehicle;
    }
}