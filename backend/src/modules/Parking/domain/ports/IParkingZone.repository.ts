import { ParkingZone } from "../entities/ParkingZone";

export interface IParkingZoneRepository{

    getAllParkingZone(): Promise<ParkingZone[]>;
    createParkingZone(parkingZone:ParkingZone): Promise<ParkingZone>
    findParkingZoneByVehicleType(vehicleType: string): Promise<ParkingZone | null>;
    updateParkingZone(idParkingZone:number, parkingZone: Partial<ParkingZone>): Promise<ParkingZone>;
    /** Ocupa un puesto en una sola operación de la base de datos; false si la zona ya estaba llena. */
    occupySpace(idParkingZone: number): Promise<boolean>;
    /** Libera un puesto en una sola operación de la base de datos; false si la zona ya estaba vacía. */
    releaseSpace(idParkingZone: number): Promise<boolean>;

}