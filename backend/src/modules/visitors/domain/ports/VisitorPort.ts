import { Visitor } from "../entities/Visitor";

export interface VisitorPort{
    /**
     * Guarda el visitante junto con su vehículo, todo o nada. Si el vehículo tiene placa y ya
     * existe, se reutiliza en vez de crear otro. Devuelve el visitante con el vehículo definitivo.
     */
    register(visitor: Visitor): Promise<Visitor>;
    findById(id: string): Promise<Visitor | null>;
    /** Del más reciente al más antiguo. */
    findAll(): Promise<Visitor[]>;
    /** Devuelve null si el visitante no existe. Autorizar a quien ya está autorizado no cambia nada. */
    authorize(id: string): Promise<Visitor | null>;
    /**
     * Registra la hora de salida. Devuelve null si el visitante no existe. No exige que
     * `is_authorized` sea true: esa regla la aplica quien use el puerto (4.6 de
     * planeacion-desarrollo.md deja esa decisión en la capa de presentación).
     */
    registerExit(id: string): Promise<Visitor | null>;
}
