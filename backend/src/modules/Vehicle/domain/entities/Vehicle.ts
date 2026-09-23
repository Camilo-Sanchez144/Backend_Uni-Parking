/** Datos que declara quien registra un vehículo. Cuáles se piden depende del tipo (moto, scooter, bicicleta). */
export type VehicleData = {
    plate?: string;
    brand?: string;
    model?: number;
    color: string;
    type: string;
    frame_serial?: string;
};

export class Vehicle{
    constructor(
      public readonly id: string,
      public readonly plate: string | null,
      public readonly brand: string | null,
      public readonly model: number | null,
      public readonly color: string,
      public readonly type: string,
      public is_authorized: boolean,
      public readonly id_owner: number | null,
      public readonly frame_serial: string | null,
  ) {}
}
