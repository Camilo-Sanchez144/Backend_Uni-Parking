import { VehicleRepository } from './../../../Vehicle/infraestructure/adapters/Vehicle.repository';
import { AppDataSource } from "../../../../shared/config/database";
import { RegisterEntryUseCase } from "../../application/use-cases/RegisterEntryUseCase";
import { RegisterExitUseCase } from "../../application/use-cases/RegisterExitUseCase";
import { AccessRecordRepository } from "../adapters/AccessRecord.repository";
import { AccessRecordController } from "./AccessRecord.controller";
import { ParkingZoneRepository } from '../adapters/ParkingZone.repository';
import { RegisterEntryVisitorUseCase } from '../../application/use-cases/RegisterEntryVisitorUseCase';
import { RegisterExitVisitorUseCase } from '../../application/use-cases/RegisterExitVisitorUseCase';
import { VisitorRepository } from '../../../Visitors/infraestructure/adapters/Visitor.repository';
import { GetOpenAccessRecordsUseCase } from '../../application/use-cases/GetOpenAccessRecordsUseCase';
import { GethistoricalByPlateUseCase } from '../../application/use-cases/GethistoricalByPlateUseCase';
import { GetVehicleStatusUseCase } from '../../application/use-cases/GetStatusVehicleUseCase';

const vehicleRepository = new VehicleRepository(AppDataSource);
const visitorRepository = new VisitorRepository(AppDataSource);
const parkingZoneRepository = new ParkingZoneRepository(AppDataSource);
const accessRecordRepository = new AccessRecordRepository(AppDataSource);

const AccessRecordControllerInstance = new AccessRecordController(
    new RegisterEntryUseCase(vehicleRepository, parkingZoneRepository ,accessRecordRepository),
    new RegisterExitUseCase(accessRecordRepository, parkingZoneRepository),
    new RegisterEntryVisitorUseCase(visitorRepository, parkingZoneRepository ,accessRecordRepository),
    new RegisterExitVisitorUseCase(accessRecordRepository, parkingZoneRepository),
    new GetOpenAccessRecordsUseCase(accessRecordRepository),
    new GethistoricalByPlateUseCase(accessRecordRepository, vehicleRepository),
    new GetVehicleStatusUseCase(accessRecordRepository)
)

export default AccessRecordControllerInstance;