import { IVisitorRepository } from "../../domain/ports/IVisitor.repository";
import { Visitor } from "../../domain/entities/Visitor";

export class GetVisitor {
    constructor(private readonly visitorPort: IVisitorRepository) {}

    async execute(id: number): Promise<Visitor | null> {
        return this.visitorPort.findById(id);
    }
}
