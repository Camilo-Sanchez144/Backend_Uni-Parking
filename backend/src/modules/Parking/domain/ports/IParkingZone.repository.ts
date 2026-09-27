import { ParkingZone } from "../entities/ParkingZone";

export interface IParkingZoneRepository{

    getAllParkingZone(): Promise<ParkingZone[]>;
    findParkingZoneByVehicleType(vehicleType: string): Promise<ParkingZone | null>;
    updateParkingZone( parkingZone: ParkingZone): Promise<ParkingZone>;

}