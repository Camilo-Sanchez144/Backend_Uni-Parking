import { VisitorPort } from "../../domain/ports/VisitorPort";
import { Visitor } from "../../domain/entities/Visitor";

export class AuthorizeVisitor {
    constructor(private readonly visitorPort: VisitorPort) {}

    async execute(id: string): Promise<Visitor | null> {
        return this.visitorPort.authorize(id);
    }
}
