import { IVehicleRepository } from "../../domain/ports/IVehicle.Repository";

export class AuthorizeVehicleUseCase {
    constructor(private readonly vehicleRepository: IVehicleRepository) {}

    async execute(plate:string): Promise<void> {
      const vehicle = this.vehicleRepository.authorizeVehicle(plate);
      return vehicle;
    }
}