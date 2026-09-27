import { VisitorPort } from "../../domain/ports/IVisitor.repository";
import { Visitor } from "../../domain/entities/Visitor";
export declare class RegisterVisitorExit {
    private readonly visitorPort;
    constructor(visitorPort: VisitorPort);
    execute(id: string): Promise<Visitor | null>;
}
//# sourceMappingURL=RegisterVisitorExitUseCase.d.ts.map