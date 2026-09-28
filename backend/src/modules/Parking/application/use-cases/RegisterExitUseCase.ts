import { IAccessRecordRepository } from "../../domain/ports/IAccessRecord.repository";
import { IParkingZoneRepository } from "../../domain/ports/IParkingZone.repository";

export class RegisterExitUseCase {

    constructor(
        private accessRecordRepository: IAccessRecordRepository,
        private parkingZoneRepository: IParkingZoneRepository
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
        if (zone.id === undefined) {
            throw new Error('No se puede actualizar una zona de parqueo sin id');
        }
        // Primero se cierra el registro, y solo si seguía abierto: si otra salida del
        // mismo vehículo se adelantó, no se libera el puesto dos veces.
        if (!(await this.accessRecordRepository.closeAccessRecord(record))) {
            throw new Error(
                "El vehículo no se encuentra dentro del parqueadero"
            );
        }
        await this.parkingZoneRepository.releaseSpace(zone.id);

        return record;
    }
}