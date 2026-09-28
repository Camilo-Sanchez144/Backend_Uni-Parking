import { IVehicleRepository } from "../../../Vehicle/domain/ports/IVehicle.repository";
import { AccessRecord } from "../../domain/entities/AccessRecord";
import { IAccessRecordRepository } from "../../domain/ports/IAccessRecord.repository";
import { IParkingZoneRepository } from "../../domain/ports/IParkingZone.repository";

export class RegisterEntryUseCase {

    constructor(
        private vehicleRepository: IVehicleRepository,
        private parkingZoneRepository: IParkingZoneRepository,
        private accessRecordRepository: IAccessRecordRepository
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
            vehicle.plate,
            null,
            vehicle.type,
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