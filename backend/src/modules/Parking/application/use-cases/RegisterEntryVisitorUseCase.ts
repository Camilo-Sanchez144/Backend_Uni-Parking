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
        if (zone.id === undefined) {
            throw new Error('No se puede actualizar una zona de parqueo sin id');
        }
        // El puesto se reserva en la base de datos antes de crear el registro: así dos
        // ingresos simultáneos no pueden quedarse con el mismo último puesto libre.
        if (!(await this.parkingZoneRepository.occupySpace(zone.id))) {
            throw new Error("No hay espacios disponibles");
        }

        const record = new AccessRecord(
            null,
            // Sin placa (bicicleta, scooter) va null, no "": el índice único de
            // registros abiertos por placa solo deja pasar los NULL.
            visitor.plate_vehicle_visitor || null,
            visitor.id,
            visitor.type_vehicle,
            new Date(),
            null
        );

        try {
            await this.accessRecordRepository.saveAccessRecord(record);
        } catch (error) {
            // Si el registro no se guarda (p. ej. un ingreso duplicado que frena el
            // índice único), el puesto reservado vuelve a quedar libre.
            await this.parkingZoneRepository.releaseSpace(zone.id);
            throw error;
        }

        return record;
    }
}