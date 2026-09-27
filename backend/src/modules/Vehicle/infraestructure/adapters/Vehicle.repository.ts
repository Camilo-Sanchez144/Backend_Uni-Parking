import { DataSource } from "typeorm";
import { Vehicle } from "../../domain/entities/Vehicle";
import { IVehicleRepository } from "../../domain/ports/IVehicle.repository";
import { VehicleEntity } from "../persistence/Vehicles.Entity";
import { User } from "../../../User/domain/entities/User";

export class VehicleRepository implements IVehicleRepository{

    constructor(private readonly dataSource: DataSource){}
    
    async getAllVehicles(): Promise<Vehicle[]> {
        const entities = await this.dataSource.getRepository(VehicleEntity).find({
            where:{is_authorized_vehicle:true}, 
            relations: { owner: true }
        });
        return entities.map((VehicleEntity)=>this.toDomain(VehicleEntity));
    }
    async getVehicleByPlate(plate: string): Promise<Vehicle | null> {
        const entity = await this.dataSource.getRepository(VehicleEntity).findOne({
            where: { plate_vehicle: plate, is_authorized_vehicle: true },
            relations: { owner: true },
        });
        if(!entity) return null;
        return this.toDomain(entity);
    }
    async getVehiclesDeauthorize():Promise<Vehicle[]>{
        const entities = await this.dataSource.getRepository(VehicleEntity).find({
            where:{is_authorized_vehicle:false}, 
            relations: { owner: true }
        });
        return entities.map((VehicleEntity)=>this.toDomain(VehicleEntity));
    }
    async addVehicle(vehicle: Vehicle): Promise<Vehicle> {
        const entity = this.toEntity(vehicle);
        const saved = await this.dataSource.getRepository(VehicleEntity).save(entity);
        return this.toDomain(saved);
    }
    async updateVehicle(plate: string, vehicle: Partial<Vehicle>): Promise<Vehicle> {
        const entity = await this.dataSource.getRepository(VehicleEntity).findOne({
            where: { plate_vehicle: plate, is_authorized_vehicle: true },
            relations: { owner: true },
        });
        if (!entity) throw new Error('No se encontró el vehículo a actualizar');
        const record = this.toDomain(entity);
        Object.assign(record, vehicle);
        (record as any).plate = plate;
        const updatedEntity = this.toEntity(record);
        await this.dataSource.getRepository(VehicleEntity).save(updatedEntity);
        return record;
    }
    async deauthorizeVehicle(plate: string): Promise<void> {
        const entity = await this.dataSource.getRepository(VehicleEntity).findOneBy({plate_vehicle:plate, is_authorized_vehicle:true});
        if(!entity) throw new Error('No se encontró el vehículo para desautorizar')
        await this.dataSource.getRepository(VehicleEntity).update({plate_vehicle:plate}, {is_authorized_vehicle:false});
        return; 
    }
    async authorizeVehicle(plate: string):Promise<void>{
        const entity = await this.dataSource.getRepository(VehicleEntity).findOneBy({plate_vehicle:plate, is_authorized_vehicle:false});
        if(!entity) throw new Error('No se encontró el vehículo a autorizar')
        await this.dataSource.getRepository(VehicleEntity).update({plate_vehicle:plate}, {is_authorized_vehicle:true});
        return; 
    }
    private toDomain(entity: VehicleEntity): Vehicle {
    const ownerDomain = entity.owner
        ? new User(
            entity.owner.id_user,
            entity.owner.name_user,
            entity.owner.email_user,
            entity.owner.role_id_user,
            [], // vacío a propósito, para no reintroducir la cascada
            entity.owner.status_user
        )
        : undefined;

    return new Vehicle(
        entity.plate_vehicle,
        entity.brand_vehicle,
        entity.model_vehicle,
        entity.color_vehicle,
        entity.type_vehicle,
        entity.is_authorized_vehicle,
        entity.id_owner_vehicle, // ← el string, siempre presente
        ownerDomain              // ← el objeto User, solo si la relación fue cargada
    );
}

private toEntity(vehicle: Vehicle): VehicleEntity {
    const entity = new VehicleEntity();
    entity.plate_vehicle = vehicle.plate;
    entity.brand_vehicle = vehicle.brand;
    entity.model_vehicle = vehicle.model;
    entity.color_vehicle = vehicle.color;
    entity.type_vehicle = vehicle.type;
    entity.is_authorized_vehicle = vehicle.is_authorized;
    entity.id_owner_vehicle = vehicle.id_owner; // ← solo el string, TypeORM arma la FK con esto
    return entity;
}
}