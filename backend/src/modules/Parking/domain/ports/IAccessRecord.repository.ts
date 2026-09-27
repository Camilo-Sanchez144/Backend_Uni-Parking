import { AccessRecord } from "../entities/AccessRecord";


export interface IAccessRecordRepository{

    getAllAccessRecord(): Promise<AccessRecord[]> 
    saveAccessRecord(accessRecord: AccessRecord): Promise<AccessRecord>;
    updateAccessRecord(accessRecord: AccessRecord): Promise<AccessRecord>;
    findOpenRecordByPlate(plate: string): Promise<AccessRecord | null>;
    findOpenRecordByVisitorId(visitorId: number): Promise<AccessRecord | null>;
    
}