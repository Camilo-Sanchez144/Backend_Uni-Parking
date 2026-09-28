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
        if (zone.id === undefined) {
            throw new Error('No se puede actualizar una zona de parqueo sin id');
        }
        // Primero se cierra el registro, y solo si seguía abierto: si otra salida del
        // mismo visitante se adelantó, no se libera el puesto dos veces.
        if (!(await this.accessRecordRepository.closeAccessRecord(record))) {
            throw new Error(
                "El visitante no se encuentra dentro del parqueadero"
            );
        }
        await this.parkingZoneRepository.releaseSpace(zone.id);

        return record;
    }
}