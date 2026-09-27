import { RegisterEntryUseCase } from "../../application/use-cases/RegisterEntryUseCase";
import { RegisterExitUseCase } from "../../application/use-cases/RegisterExitUseCase";
import { Request, Response } from "express";

export class AccessRecordController { 
    
    constructor(
        private readonly registerEntry: RegisterEntryUseCase,
        private readonly registerExit: RegisterExitUseCase
    ){}

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
}