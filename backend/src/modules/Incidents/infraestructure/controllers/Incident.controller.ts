import { Request, Response } from "express";

import { AddIncidentUseCase } from "../../application/use-cases/AddIncidentUseCase";
import { DeleteIncidentUseCase } from "../../application/use-cases/DeleteIncidentUseCase";
import { GetAllIncidentsUseCase } from "../../application/use-cases/GetAllIncidentsUseCase";
import { GetIncidentByIdUseCase } from "../../application/use-cases/GetIncidentByIdUseCase";
import { UpdateIncidentUseCase } from "../../application/use-cases/UpdateIncidentUseCase";

import { validateCreateIncident } from "../validations/CreateIncident.validation";
import { validateUpdateIncident } from "../validations/UpdateIncident.validation";

export class IncidentController {

    constructor(
        private readonly addIncident: AddIncidentUseCase,
        private readonly deleteIncident: DeleteIncidentUseCase,
        private readonly getAllIncidents: GetAllIncidentsUseCase,
        private readonly getIncidentById: GetIncidentByIdUseCase,
        private readonly updateIncident: UpdateIncidentUseCase
    ) {}

    create = async (req: Request, res: Response) => {
        try {
            const { error, value } = validateCreateIncident(req.body);

            if (error) {
                res.status(400).json({
                    mensaje: "Error en la validación",
                    detail: error.details
                });
                return;
            }

            const record = await this.addIncident.execute(value);

            res.status(201).json(record);

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
            const incidents = await this.getAllIncidents.execute();

            res.status(200).json(incidents);

        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    error: "Error interno del servidor",
                    details: error.message
                });
            }
        }
    }

    findById = async (req: Request, res: Response) => {
        try {
            const id = String(req.params.id);

            const incident = await this.getIncidentById.execute(id);

            if (!incident) {
                res.status(404).json({
                    message: "Incidencia no encontrada"
                });
                return;
            }

            res.status(200).json(incident);

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
            const id = String(req.params.id);

            const { error, value } = validateUpdateIncident(req.body);

            if (error) {
                res.status(400).json({
                    mensaje: "Error en la validación",
                    detail: error.details
                });
                return;
            }

            const record = await this.updateIncident.execute(id, value);

            res.status(200).json(record);

        } catch (error) {
            if (error instanceof Error && error.message === "No se encontró la incidencia a actualizar") {
                res.status(404).json({ message: "Incidencia no encontrada" });
                return;
            }

            if (error instanceof Error) {
                res.status(500).json({
                    error: "Error interno del servidor",
                    details: error.message
                });
            }
        }
    }

    delete = async (req: Request, res: Response) => {
        try {
            const id = String(req.params.id);

            await this.deleteIncident.execute(id);

            res.status(200).json({
                message: "Incidencia eliminada correctamente"
            });

        } catch (error) {
            if (error instanceof Error && error.message === "No se encontró la incidencia a eliminar") {
                res.status(404).json({ message: "Incidencia no encontrada" });
                return;
            }

            if (error instanceof Error) {
                res.status(500).json({
                    error: "Error interno del servidor",
                    details: error.message
                });
            }
        }
    }
}