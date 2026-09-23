import { Vehicle } from "../../domain/entities/Vehicle";
import { VehicleEntity } from "../persistence/Vehicles.Entity";

// Compartido con el módulo de visitantes, que guarda el vehículo dentro de su propia transacción.
export function toVehicleDomain(entity: VehicleEntity): Vehicle {
    return new Vehicle(
        entity.id_vehicle,
        entity.plate_vehicle,
        entity.brand_vehicle,
        entity.model_vehicle,
        entity.color_vehicle,
        entity.type_vehicle,
        entity.is_authorized_vehicle,
        entity.id_owner_vehicle,
        entity.frame_serial_vehicle
    );
}

export function toVehicleEntity(vehicle: Vehicle): VehicleEntity {
    const entity = new VehicleEntity();
    entity.id_vehicle = vehicle.id;
    entity.plate_vehicle = vehicle.plate;
    entity.brand_vehicle = vehicle.brand;
    entity.model_vehicle = vehicle.model;
    entity.color_vehicle = vehicle.color;
    entity.type_vehicle = vehicle.type;
    entity.is_authorized_vehicle = vehicle.is_authorized;
    entity.id_owner_vehicle = vehicle.id_owner;
    entity.frame_serial_vehicle = vehicle.frame_serial;
    return entity;
}
