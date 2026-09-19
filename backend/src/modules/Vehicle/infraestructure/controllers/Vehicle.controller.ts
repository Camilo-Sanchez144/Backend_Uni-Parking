import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { CreateVehicleDto } from "../../application/dto/Vehicle.dto";
import { UpdateVehicleDto } from "../../application/dto/UpdateVehicle.dto";
import { AddVehicleUseCase } from "../../application/use-cases/AddVehicleUseCase";
import { AuthorizeVehicleUseCase } from "../../application/use-cases/AuthorizeVehicleUseCase";
import { DeauthorizeVehicleUseCase } from "../../application/use-cases/DeauthorizeVehicleUseCase";
import { GetAllVehiclesUseCase } from "../../application/use-cases/GetAllVehiclesUseCase";
import { GetVehicleByPlateUseCase } from "../../application/use-cases/GetVehicleByPlateUseCase";
import { GetVehiclesDeauthorizedUseCase } from "../../application/use-cases/GetVehiclesDeauthorizedUseCase";
import { UpdateVehicleUseCase } from "../../application/use-cases/UpdateVehicleUseCase";

export class VehicleController {
    constructor(
        private readonly addVehicle: AddVehicleUseCase,
        private readonly authorizeVehicle: AuthorizeVehicleUseCase,
        private readonly deauthorizeVehicle: DeauthorizeVehicleUseCase,
        private readonly getAllVehicles: GetAllVehiclesUseCase,
        private readonly getVehicleByPlate: GetVehicleByPlateUseCase,
        private readonly getVehiclesDeauthorized: GetVehiclesDeauthorizedUseCase,
        private readonly updateVehicle: UpdateVehicleUseCase
    ) {}

    createVehicle = async (req: Request, res: Response): Promise<void> => {
        try {
        const dto = plainToInstance(CreateVehicleDto, req.body);
        const errors = await validate(dto);
        if (errors.length > 0) {
            res.status(400).json({ mensaje: 'Error en la validación', errors });
            return;
        }
        const record = await this.addVehicle.execute(dto);
        res.status(201).json(record);
        } catch (err: any) {
        res.status(404).json({ message: err.message });
        }
    }

    authorize = async (req: Request, res: Response): Promise<void> => {
        try {
        const plate = String(req.params.plate);
        await this.authorizeVehicle.execute(plate);
        res.status(200).json({ message: 'vehículo autorizado' });
        } catch (err: any) {
        res.status(404).json({ message: err.message });
        }
    }

    remove = async (req: Request, res: Response): Promise<void> => {
        try {
        const plate = String(req.params.plate);
        await this.deauthorizeVehicle.execute(plate);
        res.status(200).json({ message: 'vehículo desautorizado' });
        } catch (err: any) {
        res.status(404).json({ message: err.message });
        }
    }

    findAll = async (req: Request, res: Response): Promise<void> => {
        try {
        const vehicles = await this.getAllVehicles.execute();
        res.status(200).json(vehicles);
        } catch (err: any) {
        res.status(404).json({ message: err.message });
        }
    }

    findByPlate = async (req: Request, res: Response): Promise<void> => {
        try {
        const plate = String(req.params.plate);
        const vehicle = await this.getVehicleByPlate.execute(plate);
        if (!vehicle) {
            res.status(404).json({ message: "Vehículo no encontrado" });
            return;
        }
        res.status(200).json(vehicle);
        } catch (err: any) {
        res.status(404).json({ message: err.message });
        }
    }

    findDeauthorized = async (req: Request, res: Response): Promise<void> => {
        try {
        const vehicles = await this.getVehiclesDeauthorized.execute();
        res.status(200).json(vehicles);
        } catch (err: any) {
        res.status(404).json({ message: err.message });
        }
    }

    update = async (req: Request, res: Response): Promise<void> => {
        try {
        const plate = String(req.params.plate);
        const dto = plainToInstance(UpdateVehicleDto, req.body);
        const errors = await validate(dto);
        if (errors.length > 0) {
            res.status(400).json({ mensaje: 'Error en la validación', errors });
            return;
        }
        const record = await this.updateVehicle.execute(plate, dto);
        res.status(200).json(record);
        } catch (err: any) {
        res.status(404).json({ message: err.message });
        }
    }
}