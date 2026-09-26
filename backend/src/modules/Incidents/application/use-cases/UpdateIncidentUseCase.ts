import { IIncidentRepository } from "../../domain/ports/IIncident.repository";
import { UpdateIncidentDto } from "../dto/UpdateIncident.dto";
import { Incident } from "../../domain/entities/Incident";

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

        if (data.id_usuario !== undefined) {
            updateData.id_usuario = data.id_usuario;
        }

        return this.incidentRepository.updateIncident(id, updateData);
    }
}