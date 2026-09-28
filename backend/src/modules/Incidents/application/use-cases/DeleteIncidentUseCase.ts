import { IIncidentRepository } from "../../domain/ports/IIncident.repository";

export class DeleteIncidentUseCase {
    constructor(private readonly incidentRepository: IIncidentRepository) {}

    async execute(id: string): Promise<void> {
        await this.incidentRepository.deleteIncident(id);
    }
}