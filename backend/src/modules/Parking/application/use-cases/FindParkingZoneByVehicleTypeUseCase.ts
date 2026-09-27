import { ParkingZone } from '../../domain/entities/ParkingZone';
import { IParkingZoneRepository } from '../../domain/ports/IParkingZone.repository';
export class FindParkingZoneByVehicleTypeUseCase{

    constructor(private readonly parkingZoneRepository: IParkingZoneRepository){}

    async execute(vehicleType: string): Promise<ParkingZone | null> {
        return this.parkingZoneRepository.findParkingZoneByVehicleType(vehicleType);
    }
}