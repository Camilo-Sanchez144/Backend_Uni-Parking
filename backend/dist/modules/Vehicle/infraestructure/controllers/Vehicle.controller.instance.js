"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// infrastructure/controllers/Vehicle.controller.instance.ts
const database_1 = require("../../../../shared/config/database");
const Vehicle_repository_1 = require("../adapters/Vehicle.repository");
const AddVehicleUseCase_1 = require("../../application/use-cases/AddVehicleUseCase");
const AuthorizeVehicleUseCase_1 = require("../../application/use-cases/AuthorizeVehicleUseCase");
const DeauthorizeVehicleUseCase_1 = require("../../application/use-cases/DeauthorizeVehicleUseCase");
const GetAllVehiclesUseCase_1 = require("../../application/use-cases/GetAllVehiclesUseCase");
const GetVehicleByPlateUseCase_1 = require("../../application/use-cases/GetVehicleByPlateUseCase");
const GetVehiclesDeauthorizedUseCase_1 = require("../../application/use-cases/GetVehiclesDeauthorizedUseCase");
const UpdateVehicleUseCase_1 = require("../../application/use-cases/UpdateVehicleUseCase");
const Vehicle_controller_1 = require("./Vehicle.controller");
const vehicleRepository = new Vehicle_repository_1.VehicleRepository(database_1.AppDataSource);
const VehicleControllerInstance = new Vehicle_controller_1.VehicleController(new AddVehicleUseCase_1.AddVehicleUseCase(vehicleRepository), new AuthorizeVehicleUseCase_1.AuthorizeVehicleUseCase(vehicleRepository), new DeauthorizeVehicleUseCase_1.DeauthorizeVehicleUseCase(vehicleRepository), new GetAllVehiclesUseCase_1.GetAllVehiclesUseCase(vehicleRepository), new GetVehicleByPlateUseCase_1.GetVehicleByPlateUseCase(vehicleRepository), new GetVehiclesDeauthorizedUseCase_1.GetVehiclesDeauthorizedUseCase(vehicleRepository), new UpdateVehicleUseCase_1.UpdateVehicleUseCase(vehicleRepository));
exports.default = VehicleControllerInstance;
//# sourceMappingURL=Vehicle.controller.instance.js.map