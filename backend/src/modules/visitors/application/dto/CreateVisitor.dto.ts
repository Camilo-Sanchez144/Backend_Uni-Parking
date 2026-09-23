import { DocumentType } from "../../domain/entities/Visitor";
import { VehicleData } from "../../../Vehicle/domain/entities/Vehicle";

export type CreateVisitorDto = {
    first_name: string;
    last_name: string;
    document_type: DocumentType;
    document_number: string;
    reason: string;
    vehicle: VehicleData;
};
