import { IVisitorRepository } from '../../../Visitors/domain/ports/IVisitor.repository'
import { AccessRecord } from "../../domain/entities/AccessRecord";
import { IAccessRecordRepository } from "../../domain/ports/IAccessRecord.repository";
import { IParkingZoneRepository } from "../../domain/ports/IParkingZone.repository";

export class RegisterEntryVisitorUseCase {

    constructor(
        private visitorRepository: IVisitorRepository,
        private parkingZoneRepository: IParkingZoneRepository,
        private accessRecordRepository: IAccessRecordRepository
    ) {}

    async execute(idVisitor: number) {

        const visitor = await this.visitorRepository.findById(idVisitor)
        if (!visitor) {
            throw new Error("Usuario no encontrado");
        }
        const openRecord = await this.accessRecordRepository.findOpenRecordByVisitorId(idVisitor);
        if (openRecord) {
            throw new Error(
                "El visitante ya se encuentra dentro del parqueadero"
            );
        }
        const zone = await this.parkingZoneRepository.findParkingZoneByVehicleType(visitor.type_vehicle);
        if (!zone) {
            throw new Error(
                "No existe una zona para este tipo de vehículo"
            );
        }
        zone.occupySpace();
        if (zone.id === undefined) {
            throw new Error('No se puede actualizar una zona de parqueo sin id');
        }
        await this.parkingZoneRepository.updateParkingZone(zone.id,zone);

        const record = new AccessRecord(
            "",
            visitor.plate_vehicle_visitor,
            visitor.id,
            visitor.type_vehicle,
            new Date(),
            null
        );

        await this.accessRecordRepository.saveAccessRecord(record);

        return record;
    }
}