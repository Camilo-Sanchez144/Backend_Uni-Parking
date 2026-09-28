import { AccessRecord } from "../entities/AccessRecord";


export interface IAccessRecordRepository{

    getAllAccessRecord(): Promise<AccessRecord[]>;
    gethistoricalByPlate(plate:string): Promise<AccessRecord[]>; 
    saveAccessRecord(accessRecord: AccessRecord): Promise<AccessRecord>;
    /** Guarda la salida solo si el registro seguía abierto; false si ya estaba cerrado. */
    closeAccessRecord(accessRecord: AccessRecord): Promise<boolean>;
    findOpenRecordByPlate(plate: string): Promise<AccessRecord | null>;
    findOpenRecordByVisitorId(visitorId: number): Promise<AccessRecord | null>;
    /** Quién está dentro ahora: los registros sin salida, del ingreso más reciente al más antiguo. */
    findOpenRecords(): Promise<AccessRecord[]>;
    
}