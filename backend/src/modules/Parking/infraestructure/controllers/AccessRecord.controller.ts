import { GetStatusVehicleUseCase } from './../../application/use-cases/GetStatusVehicleUseCase';
import { GethistoricalByPlateUseCase } from './../../application/use-cases/GethistoricalByPlateUseCase';
import { Request, Response } from "express";
import { GetOpenAccessRecordsUseCase } from "../../application/use-cases/GetOpenAccessRecordsUseCase";
import { RegisterEntryUseCase } from "../../application/use-cases/RegisterEntryUseCase";
import { RegisterEntryVisitorUseCase } from "../../application/use-cases/RegisterEntryVisitorUseCase";
import { RegisterExitUseCase } from "../../application/use-cases/RegisterExitUseCase";
import { RegisterExitVisitorUseCase } from "../../application/use-cases/RegisterExitVisitorUseCase";

export class AccessRecordController {

    constructor(
        private readonly registerEntry: RegisterEntryUseCase,
        private readonly registerExit: RegisterExitUseCase,
        private readonly registerEntryVisitorVehicle: RegisterEntryVisitorUseCase,
        private readonly registerExitVisitorVehicle: RegisterExitVisitorUseCase,
        private readonly getOpenAccessRecords: GetOpenAccessRecordsUseCase,
        private readonly gethistoricalByPlate: GethistoricalByPlateUseCase,
        private readonly getStatusVehicle: GetStatusVehicleUseCase
    ){}

    findOpenRecords = async (req: Request, res: Response) => {
        try {
            const records = await this.getOpenAccessRecords.execute();
            res.status(200).json(records);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: "Error al consultar los registros abiertos", details: err.message });
            }
        }
    }

    registerEntryVehicle = async (req: Request, res: Response) => {
        try{
            const plate = String(req.params.plate);
            const accessRecord = await this.registerEntry.execute(plate);
            return res.status(201).json({
                message: "Ingreso registrado correctamente",
                data: accessRecord
            });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: "Error al registrar el ingreso", details: err.message });
            }
        }
    }
    getVehicleStatus = async (req: Request, res: Response) => {
        try {
            const plate = String(req.params.plate)
            const isInside = await this.getStatusVehicle.execute(plate);
            res.status(200).json({ plate: req.params.plate, isInside });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: "Error al consultar el estado del vehículo", details: err.message });
            }
        }
    }
    getVehiclehistoricalByPlate = async (req: Request, res: Response) => {
        try {
            const plate = String(req.params.plate)
            const vehicle = await this.gethistoricalByPlate.execute(plate);
            res.status(200).send(vehicle);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: "Error al consultar el estado del vehículo", details: err.message });
            }
        }
    }
    registerEntryVisitor = async (req: Request, res: Response) => {
        try{
            const visitorId = Number(req.params.visitorId);
            const accessRecord = await this.registerEntryVisitorVehicle.execute(visitorId);
            return res.status(201).json({
                message: "Ingreso registrado correctamente",
                data: accessRecord
            });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: "Error al registrar el ingreso", details: err.message });
            }
        }
    }
    registerExitVehicle = async (req: Request, res: Response) => {
        try{
            const plate = String(req.params.plate);
            const accessRecord = await this.registerExit.execute(plate);
            return res.status(200).json({
                message: "Salida registrada correctamente",
                data: accessRecord
            });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: "Error interno del servidor", details: err.message });
            }
        }
    }
    registerExitVisitor = async (req: Request, res: Response) => {
        try{
            const visitorId = Number(req.params.visitorId);
            const accessRecord = await this.registerExitVisitorVehicle.execute(visitorId);
            return res.status(200).json({
                message: "Salida registrada correctamente",
                data: accessRecord
            });
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: "Error interno del servidor", details: err.message });
            }
        }
    }
}