import { IIncidentRepository } from "../../domain/ports/IIncident.repository";

export class GetAllIncidentsUseCase {
    constructor(private readonly incidentRepository: IIncidentRepository) {}

    async execute() {
        return this.incidentRepository.getAllIncidents();
    }
}