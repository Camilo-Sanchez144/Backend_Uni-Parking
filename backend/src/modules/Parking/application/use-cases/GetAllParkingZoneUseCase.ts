import { ParkingZone } from "../../domain/entities/ParkingZone";
import { IParkingZoneRepository } from "../../domain/ports/IParkingZone.repository";

export class GetAllParkingZoneUseCase{
    constructor(private readonly parkingZoneRepository: IParkingZoneRepository){}

    async execute(): Promise<ParkingZone[]> {
        return await this.parkingZoneRepository.getAllParkingZone();
    }
}