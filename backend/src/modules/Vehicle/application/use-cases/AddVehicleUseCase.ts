import { IVehicleRepository } from "../../domain/ports/IVehicle.repository";
import { Vehicle } from "../../domain/entities/Vehicle";
import { CreateVehicleData } from "../../infraestructure/validations/CreateVehicle.validation";

export class AddVehicleUseCase {
    constructor(private readonly vehicleRepository: IVehicleRepository) {}

async execute(data: CreateVehicleData): Promise<CreateVehicleData> {
        const vehicle = new Vehicle(
            data.plate,
            data.brand,
            data.model,
            data.color,
            data.type,
            false,
            data.id_owner
        );
        return this.vehicleRepository.addVehicle(vehicle);
    }
}