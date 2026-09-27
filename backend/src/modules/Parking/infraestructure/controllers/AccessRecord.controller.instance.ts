import { VehicleRepository } from './../../../Vehicle/infraestructure/adapters/Vehicle.repository';
import { AppDataSource } from "../../../../shared/config/database";
import { RegisterEntryUseCase } from "../../application/use-cases/RegisterEntryUseCase";
import { RegisterExitUseCase } from "../../application/use-cases/RegisterExitUseCase";
import { AccessRecordRepository } from "../adapters/AccessRecord.repository";
import { AccessRecordController } from "./AccessRecord.controller";
import { ParkingZoneRepository } from '../adapters/ParkingZone.repository';

const vehicleRepository = new VehicleRepository(AppDataSource);
const parkingZoneRepository = new ParkingZoneRepository(AppDataSource);
const accessRecordRepository = new AccessRecordRepository(AppDataSource);

const AccessRecordControllerInstance = new AccessRecordController(
    new RegisterEntryUseCase(vehicleRepository, parkingZoneRepository ,accessRecordRepository),
    new RegisterExitUseCase(accessRecordRepository, parkingZoneRepository)
)

export default AccessRecordControllerInstance;