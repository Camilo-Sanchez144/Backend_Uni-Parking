"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../../../../shared/config/database");
const Visitor_repository_1 = require("../adapters/Visitor.repository");
const CreateVisitorUseCase_1 = require("../../application/use-cases/CreateVisitorUseCase");
const GetAllVisitorsUseCase_1 = require("../../application/use-cases/GetAllVisitorsUseCase");
const GetVisitorUseCase_1 = require("../../application/use-cases/GetVisitorUseCase");
const RegisterVisitorExitUseCase_1 = require("../../application/use-cases/RegisterVisitorExitUseCase");
const Visitor_controller_1 = require("./Visitor.controller");
const visitorAdapter = new Visitor_repository_1.VisitorAdapter(database_1.AppDataSource);
const VisitorControllerInstance = new Visitor_controller_1.VisitorController(new CreateVisitorUseCase_1.CreateVisitor(visitorAdapter), new GetVisitorUseCase_1.GetVisitor(visitorAdapter), new GetAllVisitorsUseCase_1.GetAllVisitors(visitorAdapter), new RegisterVisitorExitUseCase_1.RegisterVisitorExit(visitorAdapter));
exports.default = VisitorControllerInstance;
//# sourceMappingURL=Visitor.controller.instance.js.map