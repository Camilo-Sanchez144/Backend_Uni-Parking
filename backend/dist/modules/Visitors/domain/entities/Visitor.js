"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Visitor = exports.DOCUMENT_TYPES = void 0;
// De momento solo se reciben cédula y tarjeta de identidad.
exports.DOCUMENT_TYPES = ['CC', 'TI'];
/**
 * Un registro de visitante equivale a una visita: cada vez que alguien llena el formulario
 * se crea uno nuevo, con su propio id (que es lo que lleva el QR). No se puede actualizar;
 * lo único que cambia con el tiempo es `is_authorized` y, después, `exited_at`, y los cambia
 * el personal de seguridad al autorizar el ingreso y al registrar la salida.
 */
class Visitor {
    constructor(id, first_name, last_name, document_type, document_number, reason, plate_vehicle_visitor, brand_vehicle, color_vehicle, type_vehicle, model_vehicle, created_at, 
    /** Momento en que salió del parqueadero; null mientras no se registre la salida. */
    exited_at) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.document_type = document_type;
        this.document_number = document_number;
        this.reason = reason;
        this.plate_vehicle_visitor = plate_vehicle_visitor;
        this.brand_vehicle = brand_vehicle;
        this.color_vehicle = color_vehicle;
        this.type_vehicle = type_vehicle;
        this.model_vehicle = model_vehicle;
        this.created_at = created_at;
        this.exited_at = exited_at;
    }
}
exports.Visitor = Visitor;
//# sourceMappingURL=Visitor.js.map