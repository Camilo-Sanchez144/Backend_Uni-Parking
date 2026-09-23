import { IIncidentRepository } from "../../domain/ports/IIncident.repository";
export declare class DeleteIncidentUseCase {
    private readonly incidentRepository;
    constructor(incidentRepository: IIncidentRepository);
    execute(id: string): Promise<void>;
}
//# sourceMappingURL=DeleteIncidentUseCase.d.ts.map