"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetIncidentByIdUseCase = void 0;
class GetIncidentByIdUseCase {
    constructor(incidentRepository) {
        this.incidentRepository = incidentRepository;
    }
    async execute(id) {
        return this.incidentRepository.getIncidentById(id);
    }
}
exports.GetIncidentByIdUseCase = GetIncidentByIdUseCase;
//# sourceMappingURL=GetIncidentByIdUseCase.js.map