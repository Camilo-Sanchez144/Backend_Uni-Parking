import { DocumentType } from "../../domain/entities/Visitor";

export type CreateVisitorDto = {
    first_name: string;
    last_name: string;
    document_type: DocumentType;
    document_number: string;
    reason: string;
    plate_vehicle_visitor: string;
    brand_vehicle:string;
    model_vehicle:number;
    color_vehicle: string;
    type_vehicle:string;
};
