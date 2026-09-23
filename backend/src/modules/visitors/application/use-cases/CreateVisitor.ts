import { randomUUID } from "crypto";
import { VisitorPort } from "../../domain/ports/VisitorPort";
import { Visitor } from "../../domain/entities/Visitor";
import { Vehicle } from "../../../Vehicle/domain/entities/Vehicle";
import { CreateVisitorDto } from "../dto/CreateVisitor.dto";

export class CreateVisitor {
    constructor(private readonly visitorPort: VisitorPort) {}

    async execute(data: CreateVisitorDto): Promise<Visitor> {
        // El vehículo de un visitante no tiene propietario institucional y nace sin autorizar.
        const vehicle = new Vehicle(
            randomUUID(),
            data.vehicle.plate ?? null,
            data.vehicle.brand ?? null,
            data.vehicle.model ?? null,
            data.vehicle.color,
            data.vehicle.type,
            false,
            null,
            data.vehicle.frame_serial ?? null
        );
        // El visitante también nace sin autorizar y sin salida: solo el personal de seguridad
        // lo autoriza y, después, registra su salida.
        const visitor = new Visitor(
            randomUUID(),
            data.first_name,
            data.last_name,
            data.document_type,
            data.document_number,
            data.reason,
            false,
            vehicle,
            new Date(),
            null
        );
        return this.visitorPort.register(visitor);
    }
}
