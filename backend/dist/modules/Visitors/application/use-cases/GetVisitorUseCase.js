"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetVisitor = void 0;
class GetVisitor {
    constructor(visitorPort) {
        this.visitorPort = visitorPort;
    }
    async execute(id) {
        return this.visitorPort.findById(id);
    }
}
exports.GetVisitor = GetVisitor;
//# sourceMappingURL=GetVisitorUseCase.js.map