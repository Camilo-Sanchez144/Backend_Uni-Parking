import { IIncidentRepository } from "../../domain/ports/IIncident.repository";
import { Incident } from "../../domain/entities/Incident";
import { CreateIncidentData } from "../../infraestructure/validations/CreateIncident.validation";
export declare class AddIncidentUseCase {
    private readonly incidentRepository;
    constructor(incidentRepository: IIncidentRepository);
    execute(data: CreateIncidentData): Promise<Incident>;
}
//# sourceMappingURL=AddIncidentUseCase.d.ts.map