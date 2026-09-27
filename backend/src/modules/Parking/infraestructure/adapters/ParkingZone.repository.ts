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