import { IIncidentRepository } from "../../domain/ports/IIncident.repository";
import { Incident } from "../../domain/entities/Incident";
import { CreateIncidentData } from "../../infraestructure/validations/CreateIncident.validation";

export class AddIncidentUseCase {
    constructor(private readonly incidentRepository: IIncidentRepository) {}

    async execute(data: CreateIncidentData): Promise<CreateIncidentData> {
        const incident = new Incident(
            data.fecha_hora,
            data.tipo,
            data.descripcion,
            data.estado,
            data.id_usuario
        );

        return this.incidentRepository.addIncident(incident);
    }
}