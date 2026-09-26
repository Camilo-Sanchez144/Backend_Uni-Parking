"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toVehicleDomain = toVehicleDomain;
exports.toVehicleEntity = toVehicleEntity;
const Vehicles_Entity_1 = require("../../modules/Vehicle/infraestructure/persistence/Vehicles.Entity");
const Vehicle_1 = require("../../modules/Vehicle/domain/entities/Vehicle");
function toVehicleDomain(entity) {
    return new Vehicle_1.Vehicle(entity.plate_vehicle, entity.brand_vehicle, entity.model_vehicle, entity.color_vehicle, entity.type_vehicle, entity.is_authorized_vehicle, entity.id_owner_vehicle);
}
function toVehicleEntity(vehicle) {
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
//# sourceMappingURL=mapperVehicle.js.map