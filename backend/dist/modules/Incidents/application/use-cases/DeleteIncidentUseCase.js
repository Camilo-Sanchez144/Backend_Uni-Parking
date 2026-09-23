"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteIncidentUseCase = void 0;
class DeleteIncidentUseCase {
    constructor(incidentRepository) {
        this.incidentRepository = incidentRepository;
    }
    async execute(id) {
        await this.incidentRepository.deleteIncident(id);
    }
}
exports.DeleteIncidentUseCase = DeleteIncidentUseCase;
//# sourceMappingURL=DeleteIncidentUseCase.js.map