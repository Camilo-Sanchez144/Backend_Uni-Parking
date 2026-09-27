"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const Vehicle_routes_1 = __importDefault(require("../modules/Vehicle/infraestructure/routes/Vehicle.routes"));
const User_routes_1 = __importDefault(require("../modules/User/infraestructure/routes/User.routes"));
const Visitor_routes_1 = __importDefault(require("../modules/Visitors/infraestructure/routes/Visitor.routes"));
function createApp() {
    const app = (0, express_1.default)();
    const cors = require('cors');
    app.use(express_1.default.json());
    app.use(cors());
    app.use('/vehicles', Vehicle_routes_1.default);
    app.use('/users', User_routes_1.default);
    app.use('/visitors', Visitor_routes_1.default);
    return app;
}
//# sourceMappingURL=app.js.map