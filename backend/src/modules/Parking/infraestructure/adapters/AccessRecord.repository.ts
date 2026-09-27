import { DataSource, IsNull } from "typeorm";
import { AccessRecord } from "../../domain/entities/AccessRecord";
import { IAccessRecordRepository } from "../../domain/ports/IAccessRecord.repository";
import { AccessRecordEntity } from "../persistence/AccessRecord.Entity";

export class AccessRecordRepository implements IAccessRecordRepository{
    
    constructor(private readonly dataSource: DataSource){}

    async getAllAccessRecord(): Promise<AccessRecord[]> {
        const entities = await this.dataSource.getRepository(AccessRecordEntity).find();
        return entities.map(entity =>this.toDomain(entity)); 
    }
    async saveAccessRecord(accessRecord: AccessRecord): Promise<AccessRecord> {
        const entity = this.toEntity(accessRecord);
        const saved = await this.dataSource.getRepository(AccessRecordEntity).save(entity);
        return this.toDomain(saved);
    }
    async updateAccessRecord(accessRecord: AccessRecord): Promise<AccessRecord> {
        if (accessRecord.id === null) {
            throw new Error("No se puede actualizar un registro de acceso sin ID");
        }
        await this.dataSource.getRepository(AccessRecordEntity).update(accessRecord.id, { exit_date_time_access_record: accessRecord.exitDateTime });
        return accessRecord;
    }
    async findOpenRecordByPlate(plate: string): Promise<AccessRecord | null> {
        const entity = await this.dataSource.getRepository(AccessRecordEntity).findOne({
            where: {
                plate_access_record: plate,
                exit_date_time_access_record: IsNull()
            }
        });
        if (!entity) return null;
        return this.toDomain(entity);
    }
    async findOpenRecordByVisitorId(visitorId: number): Promise<AccessRecord | null> {
        const entity = await this.dataSource.getRepository(AccessRecordEntity).findOne({
            where: {
                visitor_id_access_record: visitorId,
                exit_date_time_access_record: IsNull()
            }
        });
        if (!entity) return null;
        return this.toDomain(entity);
    }
    private toDomain(entity: AccessRecordEntity): AccessRecord {
        return new AccessRecord(
            entity.id_access_record,
            entity.plate_access_record,
            entity.visitor_id_access_record,
            entity.zone_type_access_record,
            entity.entry_date_time_access_record,
            entity.exit_date_time_access_record
        );
    }
    private toEntity(domain: AccessRecord): AccessRecordEntity {
        const entity = new AccessRecordEntity();
        entity.id_access_record = domain.id;
        entity.plate_access_record = domain.plate;
        entity.visitor_id_access_record = domain.visitorId;
        entity.zone_type_access_record = domain.zoneType;
        entity.entry_date_time_access_record = domain.entryDateTime;
        entity.exit_date_time_access_record = domain.exitDateTime;
        return entity;
    }
}