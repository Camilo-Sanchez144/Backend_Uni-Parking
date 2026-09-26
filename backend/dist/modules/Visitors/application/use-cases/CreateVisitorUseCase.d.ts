import { VisitorPort } from "../../domain/ports/IVisitor.repository";
import { Visitor } from "../../domain/entities/Visitor";
import { CreateVisitorDto } from "../dto/CreateVisitor.dto";
export declare class CreateVisitor {
    private readonly visitorPort;
    constructor(visitorPort: VisitorPort);
    execute(data: CreateVisitorDto): Promise<Visitor>;
}
//# sourceMappingURL=CreateVisitorUseCase.d.ts.map