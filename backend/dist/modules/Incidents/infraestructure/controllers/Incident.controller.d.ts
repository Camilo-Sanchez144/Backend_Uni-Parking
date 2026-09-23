import { Request, Response } from "express";
import { AddIncidentUseCase } from "../../application/use-cases/AddIncidentUseCase";
import { DeleteIncidentUseCase } from "../../application/use-cases/DeleteIncidentUseCase";
import { GetAllIncidentsUseCase } from "../../application/use-cases/GetAllIncidentsUseCase";
import { GetIncidentByIdUseCase } from "../../application/use-cases/GetIncidentByIdUseCase";
import { UpdateIncidentUseCase } from "../../application/use-cases/UpdateIncidentUseCase";
export declare class IncidentController {
    private readonly addIncident;
    private readonly deleteIncident;
    private readonly getAllIncidents;
    private readonly getIncidentById;
    private readonly updateIncident;
    constructor(addIncident: AddIncidentUseCase, deleteIncident: DeleteIncidentUseCase, getAllIncidents: GetAllIncidentsUseCase, getIncidentById: GetIncidentByIdUseCase, updateIncident: UpdateIncidentUseCase);
    create: (req: Request, res: Response) => Promise<void>;
    findAll: (req: Request, res: Response) => Promise<void>;
    findById: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=Incident.controller.d.ts.map