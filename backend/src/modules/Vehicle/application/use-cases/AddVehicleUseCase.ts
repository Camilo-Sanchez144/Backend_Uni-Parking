import { randomUUID } from "crypto";
import { IVehicleRepository } from "../../domain/ports/IVehicle.repository";
import { Vehicle } from "../../domain/entities/Vehicle";
import { CreateVehicleData } from "../../infraestructure/validations/CreateVehicle.validation";

export class AddVehicleUseCase {
    constructor(private readonly vehicleRepository: IVehicleRepository) {}

async execute(data: CreateVehicleData): Promise<Vehicle> {
        const vehicle = new Vehicle(
            randomUUID(),
            data.plate ?? null,
            data.brand ?? null,
            data.model ?? null,
            data.color,
            data.type,
            false,
            data.id_owner,
            data.frame_serial ?? null
        );
        return this.vehicleRepository.addVehicle(vehicle);
    }
}
