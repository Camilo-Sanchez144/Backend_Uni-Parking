import { DataSource, Repository } from "typeorm";
import { Visitor, DocumentType } from "../../domain/entities/Visitor";
import { VisitorPort } from "../../domain/ports/IVisitor.repository";
import { Vehicle } from "../../../Vehicle/domain/entities/Vehicle";
import { VisitorEntity } from "../persistence/Visitor.Entity";

export class VisitorRepository implements VisitorPort{

    constructor(private readonly dataSource: DataSource){}

    async register(visitor: Visitor): Promise<Visitor> {
        const entity = this.toEntity(visitor);
        const saved = await this.dataSource.getRepository(VisitorEntity).save(entity);
        return this.toDomain(saved);
    }
    async findById(id: string): Promise<Visitor | null> {
        const model = await this.dataSource.getRepository(VisitorEntity).findOne({where:{id_visitor:id}});
        if(!model) return null;
        return this.toDomain(model);
    }
    async findAll(): Promise<Visitor[]> {
        const models = await this.dataSource.getRepository(VisitorEntity).find();
        return models.map((model)=>this.toDomain(model));
    }
    async registerExit(id: string): Promise<Visitor | null> {
        const result = await this.dataSource.getRepository(VisitorEntity).update({id_visitor:id}, {exited_at_visitor: new Date()});
        if(!result.affected) return null;
        return this.findById(id);
    }

    private toDomain(model: VisitorEntity): Visitor {
        return new Visitor(
        model.id_visitor,
        model.first_name_visitor,
        model.last_name_visitor,
        model.document_type_visitor as DocumentType,
        model.document_number_visitor,
        model.reason_visitor,
        model.plate_vehicle_visitor,
        model.brand_vehicle,
        model.color_vehicle,
        model.type_vehicle,
        model.model_vehicle,
        model.created_at_visitor,
        model.exited_at_visitor
        );
    }

    private toEntity(visitor: Visitor): VisitorEntity {
        const model = new VisitorEntity();
        model.id_visitor = visitor.id;
        model.first_name_visitor = visitor.first_name;
        model.last_name_visitor = visitor.last_name;
        model.document_type_visitor = visitor.document_type;
        model.document_number_visitor = visitor.document_number;
        model.reason_visitor = visitor.reason;
        model.plate_vehicle_visitor = visitor.plate_vehicle_visitor;
        model.brand_vehicle = visitor.brand_vehicle;
        model.color_vehicle = visitor.color_vehicle;
        model.type_vehicle = visitor.type_vehicle;
        model.created_at_visitor = visitor.created_at;
        return model;
    }

}
