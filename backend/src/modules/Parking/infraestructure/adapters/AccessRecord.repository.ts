import { DataSource, IsNull, Not } from "typeorm";
import { AccessRecord } from "../../domain/entities/AccessRecord";
import { IAccessRecordRepository, OpenAccessRecordsCount } from "../../domain/ports/IAccessRecord.repository";
import { AccessRecordEntity } from "../persistence/AccessRecord.Entity";

export class AccessRecordRepository implements IAccessRecordRepository{
    
    constructor(private readonly dataSource: DataSource){}

    async getAllAccessRecord(): Promise<AccessRecord[]> {
        const entities = await this.dataSource.getRepository(AccessRecordEntity).find();
        return entities.map(entity =>this.toDomain(entity)); 
    }
    async gethistoricalByPlate(plate:string): Promise<AccessRecord[]> {
        const entities = await this.dataSource.getRepository(AccessRecordEntity).find({where: {plate_access_record:plate}});
        return entities.map(entity =>this.toDomain(entity)); 
    }
    async getLatestRecordByPlate(plate: string): Promise<AccessRecord | null> {
        const entity = await this.dataSource.getRepository(AccessRecordEntity).findOne({
            where: { plate_access_record: plate },
            order: { entry_date_time_access_record: "DESC" },
        });
        return entity ? this.toDomain(entity) : null;
    }
    async saveAccessRecord(accessRecord: AccessRecord): Promise<AccessRecord> {
        const entity = this.toEntity(accessRecord);
        const saved = await this.dataSource.getRepository(AccessRecordEntity).save(entity);
        return this.toDomain(saved);
    }
    async closeAccessRecord(accessRecord: AccessRecord): Promise<boolean> {
        if (accessRecord.id === null) {
            throw new Error("No se puede cerrar un registro de acceso sin ID");
        }
        // La condición "sin salida" va en el mismo UPDATE: de dos salidas simultáneas
        // del mismo vehículo, solo una cierra el registro (y libera el puesto).
        const result = await this.dataSource.getRepository(AccessRecordEntity).update(
            { id_access_record: accessRecord.id, exit_date_time_access_record: IsNull() },
            { exit_date_time_access_record: accessRecord.exitDateTime }
        );
        return (result.affected ?? 0) > 0;
    }
    async findOpenRecords(): Promise<AccessRecord[]> {
        const entities = await this.dataSource.getRepository(AccessRecordEntity).find({
            where: { exit_date_time_access_record: IsNull() },
            order: { entry_date_time_access_record: "DESC" }
        });
        return entities.map(entity => this.toDomain(entity));
    }
    async countOpenRecords(): Promise<OpenAccessRecordsCount> {
        const repository = this.dataSource.getRepository(AccessRecordEntity);
        const [institutional, visitors] = await Promise.all([
            repository.count({ where: { exit_date_time_access_record: IsNull(), visitor_id_access_record: IsNull() } }),
            repository.count({ where: { exit_date_time_access_record: IsNull(), visitor_id_access_record: Not(IsNull()) } }),
        ]);
        return { institutional, visitors };
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