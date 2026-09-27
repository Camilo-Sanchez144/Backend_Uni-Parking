import { Request, Response } from "express";
import { AddVehicleUseCase } from "../../application/use-cases/AddVehicleUseCase";
import { AuthorizeVehicleUseCase } from "../../application/use-cases/AuthorizeVehicleUseCase";
import { DeauthorizeVehicleUseCase } from "../../application/use-cases/DeauthorizeVehicleUseCase";
import { GetAllVehiclesUseCase } from "../../application/use-cases/GetAllVehiclesUseCase";
import { GetVehicleByPlateUseCase } from "../../application/use-cases/GetVehicleByPlateUseCase";
import { GetVehiclesDeauthorizedUseCase } from "../../application/use-cases/GetVehiclesDeauthorizedUseCase";
import { UpdateVehicleUseCase } from "../../application/use-cases/UpdateVehicleUseCase";
import { validateCreateVehicle } from "../validations/CreateVehicle.validation";
import { validateUpdateVehicle } from "../validations/UpdateVehicle.validation";

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

    createVehicle = async (req: Request, res: Response) => {
        try {
            const { error, value } = validateCreateVehicle(req.body);
            if (error) {
                res.status(400).json({
                    mensaje: 'Error en la validación',
                    detail: error.details
                });
                return;
            }
            const record = await this.addVehicle.execute(value);
            res.status(201).json(record);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: "Error interno del servidor", details: err.message });
            }
        }
    }

    authorize = async (req: Request, res: Response) => {
        try {
            const plate = String(req.params.plate);
            await this.authorizeVehicle.execute(plate);
            res.status(200).json({ message: 'vehículo autorizado' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    error: "Error interno del servidor",
                    details: error.message
                });
            }
        }
    }

    remove = async (req: Request, res: Response) => {
        try {
            const plate = String(req.params.plate);
            await this.deauthorizeVehicle.execute(plate);
            res.status(200).json({ message: 'vehículo desautorizado' });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    error: "Error interno del servidor",
                    details: error.message
                });
            }
        }
    }

    findAll = async (req: Request, res: Response) => {
        try {
            const vehicles = await this.getAllVehicles.execute();
            res.status(200).json(vehicles);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    error: "Error interno del servidor",
                    details: error.message
                });
            }
        }
    }

    findByPlate = async (req: Request, res: Response) => {
        try {
            const plate = String(req.params.plate);
            const vehicle = await this.getVehicleByPlate.execute(plate);
            if (!vehicle) {
                res.status(404).json({ message: "Vehículo no encontrado" });
                return;
            }
            res.status(200).json(vehicle);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    error: "Error interno del servidor",
                    details: error.message
                });
            }
        }
    }

    findDeauthorized = async (req: Request, res: Response) => {
        try {
            const vehicles = await this.getVehiclesDeauthorized.execute();
            res.status(200).json(vehicles);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    error: "Error interno del servidor",
                    details: error.message
                });
            }
        }
    }

    update = async (req: Request, res: Response) => {
        try {
            const plate = String(req.params.plate);
            const { error, value } = validateUpdateVehicle(req.body);

            if (error) {
                res.status(400).json({ mensaje: 'Error en la validación', detail: error.details });
                return;
            }

            const record = await this.updateVehicle.execute(plate, value);
            res.status(200).json(record);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: "Error interno del servidor", details: err.message });
            }
        }
    }
}