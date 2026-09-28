import { ParkingZone } from "../../domain/entities/ParkingZone";
import { IParkingZoneRepository } from "../../domain/ports/IParkingZone.repository";

export class UpdateParkingZoneUseCase {
    constructor(private readonly parkingZoneRepository: IParkingZoneRepository) {}

    async execute(idParkingZone: number, parkingZone: Partial<ParkingZone>): Promise<ParkingZone> {
        const parking = await this.parkingZoneRepository.updateParkingZone(idParkingZone, parkingZone);
        return parking;
    }
}