import { VisitorPort } from "../../domain/ports/IVisitor.repository";
import { Visitor } from "../../domain/entities/Visitor";

export class GetVisitor {
    constructor(private readonly visitorPort: VisitorPort) {}

    async execute(id: string): Promise<Visitor | null> {
        return this.visitorPort.findById(id);
    }
}
