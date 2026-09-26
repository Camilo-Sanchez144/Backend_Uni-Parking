import { VisitorPort } from "../../domain/ports/IVisitor.repository";
import { Visitor } from "../../domain/entities/Visitor";
import { CreateVisitorDto } from "../dto/CreateVisitor.dto";

export class CreateVisitor {

    constructor(private readonly visitorRepository: VisitorPort) {}

    async execute(data: CreateVisitorDto): Promise<Visitor> {

        // El visitante nace sin salida registrada.
        // La salida se registra posteriormente por el personal de seguridad.
        const visitor = new Visitor(
            0,
            data.first_name,
            data.last_name,
            data.document_type,
            data.document_number,
            data.reason,

            // Datos del vehículo
            data.vehicle.plate ?? "",
            data.vehicle.brand,
            data.vehicle.color,
            data.vehicle.type,
            data.vehicle.model,

            new Date(),
            null
        );

        return this.visitorRepository.register(visitor);
    }
}

