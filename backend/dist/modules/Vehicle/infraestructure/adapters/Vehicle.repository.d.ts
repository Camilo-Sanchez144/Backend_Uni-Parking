import { DataSource } from "typeorm";
import { Vehicle } from "../../domain/entities/Vehicle";
import { IVehicleRepository } from "../../domain/ports/IVehicle.repository";
export declare class VehicleRepository implements IVehicleRepository {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    getAllVehicles(): Promise<Vehicle[]>;
    getVehicleByPlate(plate: string): Promise<Vehicle | null>;
    getVehiclesDeauthorize(): Promise<Vehicle[]>;
    addVehicle(vehicle: Vehicle): Promise<Vehicle>;
    updateVehicle(plate: string, vehicle: Partial<Vehicle>): Promise<Vehicle>;
    deauthorizeVehicle(plate: string): Promise<void>;
    authorizeVehicle(plate: string): Promise<void>;
    private toDomain;
    private toEntity;
}
//# sourceMappingURL=Vehicle.repository.d.ts.map