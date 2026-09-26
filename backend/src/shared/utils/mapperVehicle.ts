import { VehicleEntity } from "../../modules/Vehicle/infraestructure/persistence/Vehicles.Entity";
import { Vehicle } from "../../modules/Vehicle/domain/entities/Vehicle";

export function toVehicleDomain(entity: VehicleEntity): Vehicle {
        return new Vehicle(
        entity.plate_vehicle,
        entity.brand_vehicle,
        entity.model_vehicle,
        entity.color_vehicle,
        entity.type_vehicle,
        entity.is_authorized_vehicle,
        entity.id_owner_vehicle
        );
    }

export function toVehicleEntity(vehicle: Vehicle): VehicleEntity {
        const entity = new VehicleEntity();
        entity.plate_vehicle = vehicle.plate;
        entity.brand_vehicle = vehicle.brand;
        entity.model_vehicle = vehicle.model;
        entity.color_vehicle = vehicle.color;
        entity.type_vehicle = vehicle.type;
        entity.is_authorized_vehicle = vehicle.is_authorized;
        entity.id_owner_vehicle = vehicle.id_owner;
        return entity;
    }