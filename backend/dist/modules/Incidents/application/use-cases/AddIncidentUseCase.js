"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddIncidentUseCase = void 0;
const Incident_1 = require("../../domain/entities/Incident");
class AddIncidentUseCase {
    constructor(incidentRepository) {
        this.incidentRepository = incidentRepository;
    }
    async execute(data) {
        const incident = new Incident_1.Incident(undefined, new Date(data.fecha_hora), data.tipo, data.descripcion, data.estado, data.id_usuario);
        return this.incidentRepository.addIncident(incident);
    }
}
exports.AddIncidentUseCase = AddIncidentUseCase;
//# sourceMappingURL=AddIncidentUseCase.js.map