import { VisitorPort } from "../../domain/ports/IVisitor.repository";
import { Visitor } from "../../domain/entities/Visitor";

export class GetAllVisitors {
    constructor(private readonly visitorPort: VisitorPort) {}

    async execute(): Promise<Visitor[]> {
        return this.visitorPort.findAll();
    }
}
