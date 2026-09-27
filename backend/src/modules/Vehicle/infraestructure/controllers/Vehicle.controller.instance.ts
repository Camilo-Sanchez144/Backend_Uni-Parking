import { AppDataSource } from "../../../../shared/config/database";
import { VehicleRepository } from "../adapters/Vehicle.repository";
import { AddVehicleUseCase } from "../../application/use-cases/AddVehicleUseCase";
import { AuthorizeVehicleUseCase } from "../../application/use-cases/AuthorizeVehicleUseCase";
import { DeauthorizeVehicleUseCase } from "../../application/use-cases/DeauthorizeVehicleUseCase";
import { GetAllVehiclesUseCase } from "../../application/use-cases/GetAllVehiclesUseCase";
import { GetVehicleByPlateUseCase } from "../../application/use-cases/GetVehicleByPlateUseCase";
import { GetVehiclesDeauthorizedUseCase } from "../../application/use-cases/GetVehiclesDeauthorizedUseCase";
import { UpdateVehicleUseCase } from "../../application/use-cases/UpdateVehicleUseCase";
import { VehicleController } from "./Vehicle.controller";

const vehicleRepository = new VehicleRepository(AppDataSource);

const VehicleControllerInstance = new VehicleController(
  new AddVehicleUseCase(vehicleRepository),
  new AuthorizeVehicleUseCase(vehicleRepository),
  new DeauthorizeVehicleUseCase(vehicleRepository),
  new GetAllVehiclesUseCase(vehicleRepository),
  new GetVehicleByPlateUseCase(vehicleRepository),
  new GetVehiclesDeauthorizedUseCase(vehicleRepository),
  new UpdateVehicleUseCase(vehicleRepository)
);

export default VehicleControllerInstance;