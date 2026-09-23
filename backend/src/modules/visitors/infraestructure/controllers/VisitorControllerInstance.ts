import { AppDataSource } from "../../../../shared/config/database";
import { VisitorAdapter } from "../adapters/VisitorAdapter";
import { AuthorizeVisitor } from "../../application/use-cases/AuthorizeVisitor";
import { CreateVisitor } from "../../application/use-cases/CreateVisitor";
import { GetAllVisitors } from "../../application/use-cases/GetAllVisitors";
import { GetVisitor } from "../../application/use-cases/GetVisitor";
import { RegisterVisitorExit } from "../../application/use-cases/RegisterVisitorExit";
import { VisitorController } from "./VisitorController";

const visitorAdapter = new VisitorAdapter(AppDataSource);

const VisitorControllerInstance = new VisitorController(
  new CreateVisitor(visitorAdapter),
  new GetVisitor(visitorAdapter),
  new GetAllVisitors(visitorAdapter),
  new AuthorizeVisitor(visitorAdapter),
  new RegisterVisitorExit(visitorAdapter)
);

export default VisitorControllerInstance;
