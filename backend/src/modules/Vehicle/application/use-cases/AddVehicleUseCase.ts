import { IVehicleRepository } from "../../domain/ports/IVehicle.repository";
import { Vehicle } from "../../domain/entities/Vehicle";
import { CreateVehicleData } from "../../infraestructure/validations/CreateVehicle.validation";
import { randomUUID } from "crypto";

export class AddVehicleUseCase {
    constructor(private readonly vehicleRepository: IVehicleRepository) {}

async execute(data: CreateVehicleData): Promise<CreateVehicleData> {
        const vehicle = new Vehicle(
            data.plate ?? randomUUID(),
            data.brand,
            data.model,
            data.color,
            data.type,
            false,
            data.owner
        );
        return this.vehicleRepository.addVehicle(vehicle);
    }
}