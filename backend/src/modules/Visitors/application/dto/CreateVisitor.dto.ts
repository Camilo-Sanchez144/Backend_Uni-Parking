
import { DocumentType } from "../../domain/entities/Visitor";

export type CreateVisitorDto = {
    first_name: string;
    last_name: string;
    document_type: DocumentType;
    document_number: string;
    reason: string;

    vehicle: {
        plate?: string;
        brand: string;
        model: number;
        color: string;
        type: string;
    };
};

