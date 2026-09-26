"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllVisitors = void 0;
class GetAllVisitors {
    constructor(visitorPort) {
        this.visitorPort = visitorPort;
    }
    async execute() {
        return this.visitorPort.findAll();
    }
}
exports.GetAllVisitors = GetAllVisitors;
//# sourceMappingURL=GetAllVisitorsUseCase.js.map