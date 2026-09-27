import { ParkingZone } from "../../domain/entities/ParkingZone";
import { IParkingZoneRepository } from "../../domain/ports/IParkingZone.repository";
import { CreateParkingZoneData } from "../../infraestructure/validations/CreateParkingZone.validation";

export class CreateParkingZoneUseCase {

    constructor(private readonly parkingZoneRepository: IParkingZoneRepository) {}

    async execute(createParkingZoneData:CreateParkingZoneData): Promise<ParkingZone> {
        const parkingZone = new ParkingZone(
            undefined as any, 
            createParkingZoneData.vehicleType,
            createParkingZoneData.totalCapacity,
            createParkingZoneData.availableSpaces
        );

        const created = await this.parkingZoneRepository.createParkingZone(parkingZone);
        return created;
    }
}