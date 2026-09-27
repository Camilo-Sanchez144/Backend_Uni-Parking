import { Vehicle } from "../entities/Vehicle";
export interface IVehicleRepository {
    getAllVehicles(): Promise<Vehicle[]>;
    getVehicleByPlate(plate: string): Promise<Vehicle | null>;
    getVehiclesDeauthorize(): Promise<Vehicle[]>;
    addVehicle(vehicle: Vehicle): Promise<Vehicle>;
    updateVehicle(plate: string, vehicle: Partial<Vehicle>): Promise<Vehicle>;
    deauthorizeVehicle(plate: string): Promise<void>;
    authorizeVehicle(plate: string): Promise<void>;
}
//# sourceMappingURL=IVehicle.repository.d.ts.map