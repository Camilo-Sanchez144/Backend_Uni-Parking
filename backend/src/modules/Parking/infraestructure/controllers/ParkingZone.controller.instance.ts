import { AppDataSource } from "../../../../shared/config/database";
import { CreateParkingZoneUseCase } from "../../application/use-cases/CreateParkingZoneUseCase";
import { FindParkingZoneByVehicleTypeUseCase } from "../../application/use-cases/FindParkingZoneByVehicleTypeUseCase";
import { GetAllParkingZoneUseCase } from "../../application/use-cases/GetAllParkingZoneUseCase";
import { UpdateParkingZoneUseCase } from "../../application/use-cases/UpdateParkingZoneUseCase";
import { ParkingZoneRepository } from "../adapters/ParkingZone.repository";
import { ParkingZoneController } from "./ParkingZone.controller";

const parkingZoneRepository = new ParkingZoneRepository(AppDataSource);

const parkingZoneControllerIntance = new ParkingZoneController(
    new CreateParkingZoneUseCase(parkingZoneRepository),
    new FindParkingZoneByVehicleTypeUseCase(parkingZoneRepository),
    new GetAllParkingZoneUseCase(parkingZoneRepository),
    new UpdateParkingZoneUseCase(parkingZoneRepository)
);
export default parkingZoneControllerIntance;