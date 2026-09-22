import { IIncidentRepository } from "../../domain/ports/IIncident.repository";
import { UpdateIncidentDto } from "../dto/UpdateIncident.dto";

export class UpdateIncidentUseCase {
    constructor(private readonly incidentRepository: IIncidentRepository) {}

    async execute(id: string, data: UpdateIncidentDto) {
        return this.incidentRepository.updateIncident(id, data);
    }
}