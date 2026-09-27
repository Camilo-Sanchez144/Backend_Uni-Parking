"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterVisitorExit = void 0;
class RegisterVisitorExit {
    constructor(visitorPort) {
        this.visitorPort = visitorPort;
    }
    async execute(id) {
        return this.visitorPort.registerExit(id);
    }
}
exports.RegisterVisitorExit = RegisterVisitorExit;
//# sourceMappingURL=RegisterVisitorExitUseCase.js.map