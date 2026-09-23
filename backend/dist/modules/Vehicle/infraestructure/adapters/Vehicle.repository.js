"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleRepository = void 0;
const Vehicle_1 = require("../../domain/entities/Vehicle");
const Vehicles_Entity_1 = require("../persistence/Vehicles.Entity");
class VehicleRepository {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async getAllVehicles() {
        const entities = await this.dataSource.getRepository(Vehicles_Entity_1.VehicleEntity).find({ where: { is_authorized_vehicle: true } });
        return entities.map((VehicleEntity) => this.toDomain(VehicleEntity));
    }
    async getVehicleByPlate(plate) {
        const entity = await this.dataSource.getRepository(Vehicles_Entity_1.VehicleEntity).findOneBy({ plate_vehicle: plate, is_authorized_vehicle: true });
        if (!entity)
            return null;
        return this.toDomain(entity);
    }
    async getVehiclesDeauthorize() {
        const entities = await this.dataSource.getRepository(Vehicles_Entity_1.VehicleEntity).find({ where: { is_authorized_vehicle: false } });
        return entities.map((VehicleEntity) => this.toDomain(VehicleEntity));
    }
    async addVehicle(vehicle) {
        const entity = this.toEntity(vehicle);
        const saved = await this.dataSource.getRepository(Vehicles_Entity_1.VehicleEntity).save(entity);
        return this.toDomain(saved);
    }
    async updateVehicle(plate, vehicle) {
        const entity = await this.dataSource.getRepository(Vehicles_Entity_1.VehicleEntity).findOneBy({ plate_vehicle: plate, is_authorized_vehicle: true });
        if (!entity)
            throw new Error('No se encontró el vehículo a actualizar');
        const record = this.toDomain(entity);
        Object.assign(record, vehicle);
        record.plate = plate;
        const updatedEntity = this.toEntity(record);
        await this.dataSource.getRepository(Vehicles_Entity_1.VehicleEntity).save(updatedEntity);
        return record;
    }
    async deauthorizeVehicle(plate) {
        const entity = await this.dataSource.getRepository(Vehicles_Entity_1.VehicleEntity).findOneBy({ plate_vehicle: plate, is_authorized_vehicle: true });
        if (!entity)
            throw new Error('No se encontró el vehículo para desautorizar');
        await this.dataSource.getRepository(Vehicles_Entity_1.VehicleEntity).update({ plate_vehicle: plate }, { is_authorized_vehicle: false });
        return;
    }
    async authorizeVehicle(plate) {
        const entity = await this.dataSource.getRepository(Vehicles_Entity_1.VehicleEntity).findOneBy({ plate_vehicle: plate, is_authorized_vehicle: false });
        if (!entity)
            throw new Error('No se encontró el vehículo a autorizar');
        await this.dataSource.getRepository(Vehicles_Entity_1.VehicleEntity).update({ plate_vehicle: plate }, { is_authorized_vehicle: true });
        return;
    }
    toDomain(entity) {
        return new Vehicle_1.Vehicle(entity.plate_vehicle, entity.brand_vehicle, entity.model_vehicle, entity.color_vehicle, entity.type_vehicle, entity.is_authorized_vehicle, entity.id_owner_vehicle);
    }
    toEntity(vehicle) {
        const entity = new Vehicles_Entity_1.VehicleEntity();
        entity.plate_vehicle = vehicle.plate;
        entity.brand_vehicle = vehicle.brand;
        entity.model_vehicle = vehicle.model;
        entity.color_vehicle = vehicle.color;
        entity.type_vehicle = vehicle.type;
        entity.is_authorized_vehicle = vehicle.is_authorized;
        entity.id_owner_vehicle = vehicle.id_owner;
        return entity;
    }
}
exports.VehicleRepository = VehicleRepository;
//# sourceMappingURL=Vehicle.repository.js.map