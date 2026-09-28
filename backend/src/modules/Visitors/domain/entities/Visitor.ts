import { UUID } from "crypto";
import { Vehicle } from "../../../Vehicle/domain/entities/Vehicle";

// De momento solo se reciben cédula y tarjeta de identidad.
export const DOCUMENT_TYPES = ['CC', 'TI'] as const;
export type DocumentType = (typeof DOCUMENT_TYPES)[number];

/**
 * Un registro de visitante equivale a una visita: cada vez que alguien llena el formulario
 * se crea uno nuevo, con su propio id (que es lo que lleva el QR). No se puede actualizar;
 * lo único que cambia con el tiempo es `is_authorized` y, después, `exited_at`, y los cambia
 * el personal de seguridad al autorizar el ingreso y al registrar la salida.
 */
export class Visitor{
    constructor(
      public readonly id: number,
      public readonly first_name: string,
      public readonly last_name: string,
      public readonly document_type: DocumentType,
      public readonly document_number: string,
      public readonly reason: string,
      public readonly plate_vehicle_visitor: string,
      public readonly brand_vehicle: string,
      public readonly color_vehicle: string,
      public readonly type_vehicle: string,
      public readonly model_vehicle:number,
      public readonly created_at: Date,
      /** Momento en que salió del parqueadero; null mientras no se registre la salida. */
      public readonly exited_at: Date | null,
  ) {}
}
