import { AccessRecordRepository } from './../../infraestructure/adapters/AccessRecord.repository';
import { AccessRecord } from "../../domain/entities/AccessRecord";
import { IVehicleRepository } from "../../../Vehicle/domain/ports/IVehicle.repository";
import { ROLE_IDS } from "../../../Role/domain/entities/Role";

/** Error del historial con el código HTTP que le corresponde. */
export class GetHistoricalError extends Error {
    constructor(message: string, readonly statusCode: 403) {
        super(message);
    }
}

export type GetHistoricalData = {
    plate: string;
    /** uid de Firebase de quien hace la consulta (el claim del token). */
    requesterUid: string;
    /** Rol de quien hace la consulta: el claim `rolId` de su token. */
    requesterRoleId: number;
};

export class GethistoricalByPlateUseCase{

    constructor(
        private readonly accessRecordRepository: AccessRecordRepository,
        private readonly vehicleRepository: IVehicleRepository,
    ){}

    /**
     * Un userEstandar solo puede consultar el historial de una placa que sea suya (PEN-030,
     * PEN-029): de lo contrario cualquiera con este permiso podría ver los movimientos de
     * cualquier vehículo con solo adivinar la placa. Vigilancia y administración, que ya
     * pueden ver todos los vehículos por otras rutas, consultan cualquier placa sin este límite.
     */
    async execute({ plate, requesterUid, requesterRoleId }: GetHistoricalData): Promise<AccessRecord[]> {
        if (requesterRoleId === ROLE_IDS.USER_ESTANDAR && !(await this.ownsPlate(plate, requesterUid))) {
            throw new GetHistoricalError("Esa placa no es de tu cuenta", 403);
        }

        return await this.accessRecordRepository.gethistoricalByPlate(plate);
    }

    private async ownsPlate(plate: string, requesterUid: string): Promise<boolean> {
        const vehicle = await this.vehicleRepository.getVehicleByPlate(plate);
        if (vehicle) {
            return vehicle.id_owner === requesterUid;
        }

        // getVehicleByPlate solo encuentra los autorizados: un vehículo recién registrado
        // (o desautorizado) también es suyo, así que se busca también entre los demás.
        const deauthorized = await this.vehicleRepository.getVehiclesDeauthorize();
        return deauthorized.some((candidate) => candidate.plate === plate && candidate.id_owner === requesterUid);
    }
}
