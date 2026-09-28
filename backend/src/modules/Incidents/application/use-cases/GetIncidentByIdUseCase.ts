import { IIncidentRepository } from "../../domain/ports/IIncident.repository";

export class GetIncidentByIdUseCase {
    constructor(private readonly incidentRepository: IIncidentRepository) {}

    async execute(id: string) {
        return this.incidentRepository.getIncidentById(id);
    }
}