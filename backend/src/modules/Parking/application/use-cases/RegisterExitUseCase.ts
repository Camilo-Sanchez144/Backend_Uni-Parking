import { AccessRecordRepository } from "../../infraestructure/adapters/AccessRecord.repository";
import { ParkingZoneRepository } from "../../infraestructure/adapters/ParkingZone.repository";

export class RegisterExitUseCase {

    constructor(
        private accessRecordRepository: AccessRecordRepository,
        private parkingZoneRepository: ParkingZoneRepository
    ) {}

    async execute(plate: string) {

        const record = await this.accessRecordRepository.findOpenRecordByPlate(plate);

        if (!record) {
            throw new Error(
                "El vehículo no se encuentra dentro del parqueadero"
            );
        }
        record.registerExit();

        const zone = await this.parkingZoneRepository.findParkingZoneByVehicleType(record.zoneType);
        if (!zone) {
            throw new Error("Zona no encontrada");
        }
        zone.releaseSpace();
        await this.parkingZoneRepository.updateParkingZone(zone);
        await this.accessRecordRepository.updateAccessRecord(record);

        return record;
    }
}