import { VisitorPort } from "../../domain/ports/IVisitor.repository";
import { Visitor } from "../../domain/entities/Visitor";
export declare class GetAllVisitors {
    private readonly visitorPort;
    constructor(visitorPort: VisitorPort);
    execute(): Promise<Visitor[]>;
}
//# sourceMappingURL=GetAllVisitorsUseCase.d.ts.map