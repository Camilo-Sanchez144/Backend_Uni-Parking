import { IIncidentRepository } from "../../domain/ports/IIncident.repository";
import { UpdateIncidentDto } from "../dto/UpdateIncident.dto";
import { Incident } from "../../domain/entities/Incident";
export declare class UpdateIncidentUseCase {
    private readonly incidentRepository;
    constructor(incidentRepository: IIncidentRepository);
    execute(id: string, data: UpdateIncidentDto): Promise<Incident>;
}
//# sourceMappingURL=UpdateIncidentUseCase.d.ts.map