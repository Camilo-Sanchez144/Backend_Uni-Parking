import { DataSource } from "typeorm";
import { Incident } from "../../domain/entities/Incident";
import { IIncidentRepository } from "../../domain/ports/IIncident.repository";
export declare class IncidentRepository implements IIncidentRepository {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    getAllIncidents(): Promise<Incident[]>;
    getIncidentById(id: string): Promise<Incident | null>;
    addIncident(incident: Incident): Promise<Incident>;
    updateIncident(id: string, incident: Partial<Incident>): Promise<Incident>;
    deleteIncident(id: string): Promise<void>;
    private toDomain;
    private toEntity;
}
//# sourceMappingURL=Incident.repository.d.ts.map