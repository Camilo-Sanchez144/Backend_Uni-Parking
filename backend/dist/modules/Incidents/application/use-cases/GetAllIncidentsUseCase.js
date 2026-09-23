"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllIncidentsUseCase = void 0;
class GetAllIncidentsUseCase {
    constructor(incidentRepository) {
        this.incidentRepository = incidentRepository;
    }
    async execute() {
        return this.incidentRepository.getAllIncidents();
    }
}
exports.GetAllIncidentsUseCase = GetAllIncidentsUseCase;
//# sourceMappingURL=GetAllIncidentsUseCase.js.map