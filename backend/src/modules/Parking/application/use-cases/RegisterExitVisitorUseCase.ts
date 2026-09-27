import { IAccessRecordRepository } from "../../domain/ports/IAccessRecord.repository";
import { IParkingZoneRepository } from "../../domain/ports/IParkingZone.repository";

export class RegisterExitVisitorUseCase {

    constructor(
        private accessRecordRepository: IAccessRecordRepository,
        private parkingZoneRepository: IParkingZoneRepository
    ) {}

    async execute(visitorId: number) {

        const record = await this.accessRecordRepository.findOpenRecordByVisitorId(visitorId);

        if (!record) {
            throw new Error(
                "El visitante no se encuentra dentro del parqueadero"
            );
        }
        record.registerExit();

        const zone = await this.parkingZoneRepository.findParkingZoneByVehicleType(record.zoneType);
        if (!zone) {
            throw new Error("Zona no encontrada");
        }
        zone.releaseSpace();
        await this.parkingZoneRepository.updateParkingZone(zone.id, zone);
        await this.accessRecordRepository.updateAccessRecord(record);

        return record;
    }
}