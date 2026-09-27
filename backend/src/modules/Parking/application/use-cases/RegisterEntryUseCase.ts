import { VehicleRepository } from "../../../Vehicle/infraestructure/adapters/Vehicle.repository";
import { AccessRecord } from "../../domain/entities/AccessRecord";
import { AccessRecordRepository } from "../../infraestructure/adapters/AccessRecord.repository";
import { ParkingZoneRepository } from "../../infraestructure/adapters/ParkingZone.repository";

export class RegisterEntryUseCase {

    constructor(
        private vehicleRepository: VehicleRepository,
        private parkingZoneRepository: ParkingZoneRepository,
        private accessRecordRepository: AccessRecordRepository
    ) {}

    async execute(plate: string) {

        const vehicle = await this.vehicleRepository.getVehicleByPlate(plate);

        if (!vehicle) {
            throw new Error("Vehículo no encontrado");
        }
        if (!vehicle.is_authorized) {
            throw new Error("Vehículo no autorizado");
        }
        const openRecord = await this.accessRecordRepository.findOpenRecordByPlate(plate);
        if (openRecord) {
            throw new Error(
                "El vehículo ya se encuentra dentro del parqueadero"
            );
        }
        const zone = await this.parkingZoneRepository.findParkingZoneByVehicleType(vehicle.type);
        if (!zone) {
            throw new Error(
                "No existe una zona para este tipo de vehículo"
            );
        }
        zone.occupySpace();

        await this.parkingZoneRepository.updateParkingZone(zone);

        const record = new AccessRecord(
            null,
            vehicle.plate,
            null,
            vehicle.type,
            new Date(),
            null
        );

        await this.accessRecordRepository.saveAccessRecord(record);

        return record;
    }
}