import { IIncidentRepository } from "../../domain/ports/IIncident.repository";
import { UpdateIncidentDto } from "../dto/UpdateIncident.dto";
import { Incident } from "../../domain/entities/Incident";
import { UserEntity } from "../../../User/infraestructure/persistence/User.Entity";

export class UpdateIncidentUseCase {

    constructor(
        private readonly incidentRepository: IIncidentRepository
    ) {}

    async execute(id: string, data: UpdateIncidentDto): Promise<Incident> {

        const updateData: Partial<Incident> = {};

        if (data.fecha_hora !== undefined) {
            updateData.fecha_hora = new Date(data.fecha_hora);
        }

        if (data.tipo !== undefined) {
            updateData.tipo = data.tipo;
        }

        if (data.descripcion !== undefined) {
            updateData.descripcion = data.descripcion;
        }

        if (data.estado !== undefined) {
            updateData.estado = data.estado;
        }

        // Antes se asignaba `id_usuario`, que la entidad no tiene: TypeORM lo ignoraba
        // y el dueño de la incidencia nunca cambiaba.
        if (data.id_usuario !== undefined) {
            const owner = new UserEntity();
            owner.id_user = data.id_usuario;
            updateData.owner = owner;
        }

        return this.incidentRepository.updateIncident(id, updateData);
    }
}