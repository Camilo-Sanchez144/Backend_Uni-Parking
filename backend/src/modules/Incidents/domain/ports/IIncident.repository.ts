import { Incident } from "../entities/Incident";

export interface IIncidentRepository {
    getAllIncidents(): Promise<Incident[]>;
    getIncidentById(id: string): Promise<Incident | null>;
    addIncident(incident: Incident): Promise<Incident>;
    updateIncident(id: string, incident: Partial<Incident>): Promise<Incident>;
    deleteIncident(id: string): Promise<void>;
}