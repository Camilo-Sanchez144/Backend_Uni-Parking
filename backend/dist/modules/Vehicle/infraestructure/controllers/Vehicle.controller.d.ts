import { Request, Response } from "express";
import { AddVehicleUseCase } from "../../application/use-cases/AddVehicleUseCase";
import { AuthorizeVehicleUseCase } from "../../application/use-cases/AuthorizeVehicleUseCase";
import { DeauthorizeVehicleUseCase } from "../../application/use-cases/DeauthorizeVehicleUseCase";
import { GetAllVehiclesUseCase } from "../../application/use-cases/GetAllVehiclesUseCase";
import { GetVehicleByPlateUseCase } from "../../application/use-cases/GetVehicleByPlateUseCase";
import { GetVehiclesDeauthorizedUseCase } from "../../application/use-cases/GetVehiclesDeauthorizedUseCase";
import { UpdateVehicleUseCase } from "../../application/use-cases/UpdateVehicleUseCase";
export declare class VehicleController {
    private readonly addVehicle;
    private readonly authorizeVehicle;
    private readonly deauthorizeVehicle;
    private readonly getAllVehicles;
    private readonly getVehicleByPlate;
    private readonly getVehiclesDeauthorized;
    private readonly updateVehicle;
    constructor(addVehicle: AddVehicleUseCase, authorizeVehicle: AuthorizeVehicleUseCase, deauthorizeVehicle: DeauthorizeVehicleUseCase, getAllVehicles: GetAllVehiclesUseCase, getVehicleByPlate: GetVehicleByPlateUseCase, getVehiclesDeauthorized: GetVehiclesDeauthorizedUseCase, updateVehicle: UpdateVehicleUseCase);
    createVehicle: (req: Request, res: Response) => Promise<void>;
    authorize: (req: Request, res: Response) => Promise<void>;
    remove: (req: Request, res: Response) => Promise<void>;
    findAll: (req: Request, res: Response) => Promise<void>;
    findByPlate: (req: Request, res: Response) => Promise<void>;
    findDeauthorized: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=Vehicle.controller.d.ts.map