import { IIncidentRepository } from "../../domain/ports/IIncident.repository";
export declare class GetAllIncidentsUseCase {
    private readonly incidentRepository;
    constructor(incidentRepository: IIncidentRepository);
    execute(): Promise<import("../../domain/entities/Incident").Incident[]>;
}
//# sourceMappingURL=GetAllIncidentsUseCase.d.ts.map