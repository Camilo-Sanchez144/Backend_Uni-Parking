import { Request, Response } from "express";
import { CreateVisitor } from "../../application/use-cases/CreateVisitorUseCase";
import { GetAllVisitors } from "../../application/use-cases/GetAllVisitorsUseCase";
import { GetVisitor } from "../../application/use-cases/GetVisitorUseCase";
import { RegisterVisitorExit } from "../../application/use-cases/RegisterVisitorExitUseCase";
export declare class VisitorController {
    private readonly createVisitor;
    private readonly getVisitor;
    private readonly getAllVisitors;
    private readonly registerVisitorExit;
    constructor(createVisitor: CreateVisitor, getVisitor: GetVisitor, getAllVisitors: GetAllVisitors, registerVisitorExit: RegisterVisitorExit);
    create: (req: Request, res: Response) => Promise<void>;
    findAll: (req: Request, res: Response) => Promise<void>;
    findById: (req: Request, res: Response) => Promise<void>;
    exit: (req: Request, res: Response) => Promise<void>;
    private internalError;
}
//# sourceMappingURL=Visitor.controller.d.ts.map