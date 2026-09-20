import { IVehicleRepository } from "../../domain/ports/IVehicle.repository";

export class AuthorizeVehicleUseCase {
    constructor(private readonly vehicleRepository: IVehicleRepository) {}

    async execute(plate:string): Promise<void> {
      const vehicle = this.vehicleRepository.authorizeVehicle(plate);
      return vehicle;
    }
}