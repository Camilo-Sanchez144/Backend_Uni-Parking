import { IVisitorRepository } from "../../domain/ports/IVisitor.repository";
import { Visitor } from "../../domain/entities/Visitor";

export class GetAllVisitors {
    constructor(private readonly visitorPort: IVisitorRepository) {}

    async execute(): Promise<Visitor[]> {
        return this.visitorPort.findAll();
    }
}
