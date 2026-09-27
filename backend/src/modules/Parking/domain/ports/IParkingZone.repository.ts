import { ParkingZone } from "../entities/ParkingZone";

export interface IParkingZoneRepository{

    getAllParkingZone(): Promise<ParkingZone[]>;
    createParkingZone(parkingZone:ParkingZone): Promise<ParkingZone>
    findParkingZoneByVehicleType(vehicleType: string): Promise<ParkingZone | null>;
    updateParkingZone(idParkingZone:number, parkingZone: Partial<ParkingZone>): Promise<ParkingZone>;

}