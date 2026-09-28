import { DataSource } from "typeorm";
import { ParkingZone } from "../../domain/entities/ParkingZone";
import { IParkingZoneRepository } from "../../domain/ports/IParkingZone.repository";
import { ParkingZoneEntity } from "../persistence/ParkingZone.Entity";

export class ParkingZoneRepository implements IParkingZoneRepository{
    
    constructor(private readonly dataSource: DataSource){}

    async getAllParkingZone(): Promise<ParkingZone[]> {
        const entity = await this.dataSource.getRepository(ParkingZoneEntity).find();
        return entity.map(entity => this.toDomain(entity));
    }
    async createParkingZone(parkingZone:ParkingZone): Promise<ParkingZone>{
        const entity = this.toEntity(parkingZone);
        const saved = await this.dataSource.getRepository(ParkingZoneEntity).save(entity);
        return this.toDomain(saved);
    }
    async findParkingZoneByVehicleType(vehicleType: string): Promise<ParkingZone | null> {
        const entity = await this.dataSource.getRepository(ParkingZoneEntity).findOne({where:{vehicle_type_parking_zone:vehicleType}});
        if (!entity) return null;
        return this.toDomain(entity);
    }
    async updateParkingZone(idParkingZone:number, parkingZone: ParkingZone): Promise<ParkingZone> {
        await this.dataSource.getRepository(ParkingZoneEntity).update(idParkingZone,{ available_spaces_parking_zone: parkingZone.availableSpaces});
        return parkingZone;
    }
    // El cálculo lo hace Postgres en el mismo UPDATE: leer, restar y guardar desde aquí
    // perdía un ingreso cuando dos llegaban al mismo tiempo.
    async occupySpace(idParkingZone: number): Promise<boolean> {
        const result = await this.dataSource.getRepository(ParkingZoneEntity)
            .createQueryBuilder()
            .update(ParkingZoneEntity)
            .set({ available_spaces_parking_zone: () => "available_spaces_parking_zone - 1" })
            .where("id_parking_zone = :id", { id: idParkingZone })
            .andWhere("available_spaces_parking_zone > 0")
            .execute();
        return (result.affected ?? 0) > 0;
    }
    async releaseSpace(idParkingZone: number): Promise<boolean> {
        const result = await this.dataSource.getRepository(ParkingZoneEntity)
            .createQueryBuilder()
            .update(ParkingZoneEntity)
            .set({ available_spaces_parking_zone: () => "available_spaces_parking_zone + 1" })
            .where("id_parking_zone = :id", { id: idParkingZone })
            .andWhere("available_spaces_parking_zone < total_capacity_parking_zone")
            .execute();
        return (result.affected ?? 0) > 0;
    }
    private toDomain(entity: ParkingZoneEntity): ParkingZone {
        return new ParkingZone(
            entity.id_parking_zone,
            entity.vehicle_type_parking_zone,
            entity.total_capacity_parking_zone,
            entity.available_spaces_parking_zone
        )
    }
    private toEntity(parkingZone: ParkingZone): ParkingZoneEntity {
        const model = new ParkingZoneEntity();
        if (parkingZone.id !== undefined) {
            model.id_parking_zone = parkingZone.id;
        }
        model.available_spaces_parking_zone = parkingZone.availableSpaces;
        model.total_capacity_parking_zone = parkingZone.totalCapacity;
        model.vehicle_type_parking_zone = parkingZone.vehicleType;
        return model;
    }
}