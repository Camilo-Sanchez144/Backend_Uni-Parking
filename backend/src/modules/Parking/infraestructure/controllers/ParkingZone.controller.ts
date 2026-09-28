import { Request, Response } from "express";
import { UpdateParkingZoneUseCase } from './../../application/use-cases/UpdateParkingZoneUseCase';
import { GetAllParkingZoneUseCase } from './../../application/use-cases/GetAllParkingZoneUseCase';
import { FindParkingZoneByVehicleTypeUseCase } from './../../application/use-cases/FindParkingZoneByVehicleTypeUseCase';
import { CreateParkingZoneUseCase } from "../../application/use-cases/CreateParkingZoneUseCase";
import { validateCreateParkingZone, validateUpdateParkingZone } from "../validations/CreateParkingZone.validation";

export class ParkingZoneController{

    constructor(
        private readonly CreateParkingZone: CreateParkingZoneUseCase,
        private readonly FindParkingZoneByVehicleType: FindParkingZoneByVehicleTypeUseCase,
        private readonly GetAllParkingZone: GetAllParkingZoneUseCase,
        private readonly UpdateParkingZone: UpdateParkingZoneUseCase
    ){}

    createParkingZone = async (req: Request, res: Response) => {
        try{
            const { error, value } = validateCreateParkingZone(req.body);
            if (error) {
                res.status(400).json({
                    mensaje: 'Error en la validación',
                    detail: error.details
                });
                return;
            }
            const record = await this.CreateParkingZone.execute(value);
            res.status(201).json(record);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: "Error al registrar el ingreso", details: err.message });
            }
        }
    }
    findParkingZoneByVehicleType = async (req: Request, res: Response) => {
        try{
            const typeVehicle = String(req.params.typeVehicle)
            const record = await this.FindParkingZoneByVehicleType.execute(typeVehicle);
            if(!record) return res.status(404).json({message: 'No se encontró el parqueadero con ese tipo de vehiculo'});
            res.status(201).json(record);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: "Error al registrar el ingreso", details: err.message });
            }
        }
    }
    getAllParkingZone = async (req: Request, res: Response) => {
        try{
            const record = await this.GetAllParkingZone.execute();
            res.status(201).json(record);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: "Error al registrar el ingreso", details: err.message });
            }
        }
    }
    updateParkingZone = async (req: Request, res: Response) => {
        try {
            const { error, value } = validateUpdateParkingZone(req.body);
            if (error) {
                res.status(400).json({
                    mensaje: 'Error en la validación',
                    detail: error.details
                });
                return;
            }
            const idParkingZone = Number(req.params.idParkingZone);
            if (Number.isNaN(idParkingZone)) {
                res.status(400).json({ mensaje: 'El id de la zona de parqueo no es válido' });
                return;
            }
            const record = await this.UpdateParkingZone.execute(idParkingZone, value);
            res.status(200).json(record);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ error: "Error al actualizar la zona de parqueo", details: err.message });
            }
        }
    }
}