import { IIncidentRepository } from "../../domain/ports/IIncident.repository";
export declare class GetIncidentByIdUseCase {
    private readonly incidentRepository;
    constructor(incidentRepository: IIncidentRepository);
    execute(id: string): Promise<import("../../domain/entities/Incident").Incident | null>;
}
//# sourceMappingURL=GetIncidentByIdUseCase.d.ts.map