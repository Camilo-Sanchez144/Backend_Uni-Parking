import { DataSource } from "typeorm";
import { Visitor } from "../../domain/entities/Visitor";
import { VisitorPort } from "../../domain/ports/IVisitor.repository";
export declare class VisitorAdapter implements VisitorPort {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    register(visitor: Visitor): Promise<Visitor>;
    findById(id: string): Promise<Visitor | null>;
    findAll(): Promise<Visitor[]>;
    registerExit(id: string): Promise<Visitor | null>;
    private saveVehicle;
    private toDomain;
    private toEntity;
}
//# sourceMappingURL=Visitor.repository.d.ts.map