import { AppDataSource } from "../../../../shared/config/database";
import { VisitorRepository } from "../adapters/Visitor.repository";
import { CreateVisitor } from "../../application/use-cases/CreateVisitorUseCase";
import { GetAllVisitors } from "../../application/use-cases/GetAllVisitorsUseCase";
import { GetVisitor } from "../../application/use-cases/GetVisitorUseCase";
import { RegisterVisitorExit } from "../../application/use-cases/RegisterVisitorExitUseCase";
import { VisitorController } from "./Visitor.controller";

const visitorAdapter = new VisitorRepository(AppDataSource);

const VisitorControllerInstance = new VisitorController(
  new CreateVisitor(visitorAdapter),
  new GetVisitor(visitorAdapter),
  new GetAllVisitors(visitorAdapter),
  new RegisterVisitorExit(visitorAdapter)
);

export default VisitorControllerInstance;
