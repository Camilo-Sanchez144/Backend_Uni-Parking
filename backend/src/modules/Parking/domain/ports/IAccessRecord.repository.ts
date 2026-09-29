import { AccessRecord } from "../entities/AccessRecord";

/** Cuántos vehículos están dentro ahora, sin identificarlos por placa. */
export interface OpenAccessRecordsCount {
    institutional: number;
    visitors: number;
}

export interface IAccessRecordRepository{

    getAllAccessRecord(): Promise<AccessRecord[]>;
    saveAccessRecord(accessRecord: AccessRecord): Promise<AccessRecord>;
    getLatestRecordByPlate(plate: string): Promise<AccessRecord | null>;
    /** Guarda la salida solo si el registro seguía abierto; false si ya estaba cerrado. */
    closeAccessRecord(accessRecord: AccessRecord): Promise<boolean>;
    findOpenRecordByPlate(plate: string): Promise<AccessRecord | null>;
    findOpenRecordByVisitorId(visitorId: number): Promise<AccessRecord | null>;
    /** Quién está dentro ahora: los registros sin salida, del ingreso más reciente al más antiguo. */
    findOpenRecords(): Promise<AccessRecord[]>;
    /** Lo mismo que `findOpenRecords`, pero solo el conteo: no expone ninguna placa. */
    countOpenRecords(): Promise<OpenAccessRecordsCount>;

}