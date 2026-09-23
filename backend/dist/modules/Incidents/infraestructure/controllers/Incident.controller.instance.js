"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../../../shared/config/database");
const Incident_repository_1 = require("../adapters/Incident.repository");
const AddIncidentUseCase_1 = require("../../application/use-cases/AddIncidentUseCase");
const DeleteIncidentUseCase_1 = require("../../application/use-cases/DeleteIncidentUseCase");
const GetAllIncidentsUseCase_1 = require("../../application/use-cases/GetAllIncidentsUseCase");
const GetIncidentByIdUseCase_1 = require("../../application/use-cases/GetIncidentByIdUseCase");
const UpdateIncidentUseCase_1 = require("../../application/use-cases/UpdateIncidentUseCase");
const Incident_controller_1 = require("./Incident.controller");
const incidentRepository = new Incident_repository_1.IncidentRepository(database_1.AppDataSource);
const IncidentControllerInstance = new Incident_controller_1.IncidentController(new AddIncidentUseCase_1.AddIncidentUseCase(incidentRepository), new DeleteIncidentUseCase_1.DeleteIncidentUseCase(incidentRepository), new GetAllIncidentsUseCase_1.GetAllIncidentsUseCase(incidentRepository), new GetIncidentByIdUseCase_1.GetIncidentByIdUseCase(incidentRepository), new UpdateIncidentUseCase_1.UpdateIncidentUseCase(incidentRepository));
exports.default = IncidentControllerInstance;
//# sourceMappingURL=Incident.controller.instance.js.map