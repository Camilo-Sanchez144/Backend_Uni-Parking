"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const Vehicle_routes_1 = __importDefault(require("../modules/Vehicle/infraestructure/routes/Vehicle.routes"));
const Incident_routes_1 = __importDefault(require("../modules/Incidents/infraestructure/routes/Incident.routes"));
function createApp() {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use('/vehicles', Vehicle_routes_1.default);
    app.use('/incidents', Incident_routes_1.default);
    return app;
}
//# sourceMappingURL=app.js.map