import { AppDataSource } from "../../../../shared/config/database";

import { IncidentRepository } from "../adapters/Incident.repository";

import { AddIncidentUseCase } from "../../application/use-cases/AddIncidentUseCase";
import { DeleteIncidentUseCase } from "../../application/use-cases/DeleteIncidentUseCase";
import { GetAllIncidentsUseCase } from "../../application/use-cases/GetAllIncidentsUseCase";
import { GetIncidentByIdUseCase } from "../../application/use-cases/GetIncidentByIdUseCase";
import { UpdateIncidentUseCase } from "../../application/use-cases/UpdateIncidentUseCase";

import { IncidentController } from "./Incident.controller";

const incidentRepository = new IncidentRepository(AppDataSource);

const IncidentControllerInstance = new IncidentController(
    new AddIncidentUseCase(incidentRepository),
    new DeleteIncidentUseCase(incidentRepository),
    new GetAllIncidentsUseCase(incidentRepository),
    new GetIncidentByIdUseCase(incidentRepository),
    new UpdateIncidentUseCase(incidentRepository)
);

export default IncidentControllerInstance;