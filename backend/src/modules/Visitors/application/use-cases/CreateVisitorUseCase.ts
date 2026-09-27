import { VisitorPort } from "../../domain/ports/IVisitor.repository";
import { Visitor } from "../../domain/entities/Visitor";
import { CreateVisitorDto } from "../dto/CreateVisitor.dto";

export class CreateVisitor {
    constructor(private readonly visitorRepository: VisitorPort) {}

    async execute(data: Visitor): Promise<CreateVisitorDto> {
        // El visitante también nace sin autorizar y sin salida: solo el personal de seguridad
        // lo autoriza y, después, registra su salida.
        const visitor = new Visitor(
            data.id,
            data.first_name,
            data.last_name,
            data.document_type,
            data.document_number,
            data.reason,
            data.plate_vehicle_visitor,
            data.brand_vehicle,
            data.color_vehicle,
            data.type_vehicle,
            data.model_vehicle,
            new Date(),
            null
        );
        return this.visitorRepository.register(visitor)
    }
}
