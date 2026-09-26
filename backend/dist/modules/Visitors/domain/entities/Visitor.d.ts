export declare const DOCUMENT_TYPES: readonly ["CC", "TI"];
export type DocumentType = (typeof DOCUMENT_TYPES)[number];
/**
 * Un registro de visitante equivale a una visita: cada vez que alguien llena el formulario
 * se crea uno nuevo, con su propio id (que es lo que lleva el QR). No se puede actualizar;
 * lo único que cambia con el tiempo es `is_authorized` y, después, `exited_at`, y los cambia
 * el personal de seguridad al autorizar el ingreso y al registrar la salida.
 */
export declare class Visitor {
    readonly id: string;
    readonly first_name: string;
    readonly last_name: string;
    readonly document_type: DocumentType;
    readonly document_number: string;
    readonly reason: string;
    readonly plate_vehicle_visitor: string;
    readonly brand_vehicle: string;
    readonly color_vehicle: string;
    readonly type_vehicle: string;
    readonly model_vehicle: number;
    readonly created_at: Date;
    /** Momento en que salió del parqueadero; null mientras no se registre la salida. */
    readonly exited_at: Date | null;
    constructor(id: string, first_name: string, last_name: string, document_type: DocumentType, document_number: string, reason: string, plate_vehicle_visitor: string, brand_vehicle: string, color_vehicle: string, type_vehicle: string, model_vehicle: number, created_at: Date, 
    /** Momento en que salió del parqueadero; null mientras no se registre la salida. */
    exited_at: Date | null);
}
//# sourceMappingURL=Visitor.d.ts.map