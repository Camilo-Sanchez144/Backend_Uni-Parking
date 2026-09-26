import { DataSource } from "typeorm";
import { Vehicle } from "../../domain/entities/Vehicle";
import { IVehicleRepository } from "../../domain/ports/IVehicle.repository";
import { VehicleEntity } from "../persistence/Vehicles.Entity";
import { toVehicleDomain, toVehicleEntity } from "../../../../shared/utils/mapperVehicle";

export class VehicleRepository implements IVehicleRepository{

    constructor(private readonly dataSource: DataSource){}
    
    async getAllVehicles(): Promise<Vehicle[]> {
        const entities = await this.dataSource.getRepository(VehicleEntity).find({where:{is_authorized_vehicle:true}});
        return entities.map((VehicleEntity)=>this.toDomain(VehicleEntity));
    }
    async getVehicleByPlate(plate: string): Promise<Vehicle | null> {
        const entity = await this.dataSource.getRepository(VehicleEntity).findOneBy({plate_vehicle:plate, is_authorized_vehicle:true});
        if(!entity) return null;
        return this.toDomain(entity);
    }
    async getVehiclesDeauthorize():Promise<Vehicle[]>{
        const entities = await this.dataSource.getRepository(VehicleEntity).find({where:{is_authorized_vehicle:false}});
        return entities.map((VehicleEntity)=>this.toDomain(VehicleEntity));
    }
    async addVehicle(vehicle: Vehicle): Promise<Vehicle> {
        const entity = this.toEntity(vehicle);
        const saved = await this.dataSource.getRepository(VehicleEntity).save(entity);
        return this.toDomain(saved);
    }
    async updateVehicle(plate: string, vehicle: Partial<Vehicle>): Promise<Vehicle> {
        const entity = await this.dataSource.getRepository(VehicleEntity).findOneBy({ plate_vehicle: plate, is_authorized_vehicle:true });
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
        return toVehicleDomain(entity);
    }

    private toEntity(vehicle: Vehicle): VehicleEntity {
        return toVehicleEntity(vehicle);
    }
    
}