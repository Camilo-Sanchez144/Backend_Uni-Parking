"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncidentController = void 0;
const CreateIncident_validation_1 = require("../validations/CreateIncident.validation");
const UpdateIncident_validation_1 = require("../validations/UpdateIncident.validation");
class IncidentController {
    constructor(addIncident, deleteIncident, getAllIncidents, getIncidentById, updateIncident) {
        this.addIncident = addIncident;
        this.deleteIncident = deleteIncident;
        this.getAllIncidents = getAllIncidents;
        this.getIncidentById = getIncidentById;
        this.updateIncident = updateIncident;
        this.create = async (req, res) => {
            try {
                const { error, value } = (0, CreateIncident_validation_1.validateCreateIncident)(req.body);
                if (error) {
                    res.status(400).json({
                        mensaje: "Error en la validación",
                        detail: error.details
                    });
                    return;
                }
                const record = await this.addIncident.execute(value);
                res.status(201).json(record);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        error: "Error interno del servidor",
                        details: error.message
                    });
                }
            }
        };
        this.findAll = async (req, res) => {
            try {
                const incidents = await this.getAllIncidents.execute();
                res.status(200).json(incidents);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        error: "Error interno del servidor",
                        details: error.message
                    });
                }
            }
        };
        this.findById = async (req, res) => {
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
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({
                        error: "Error interno del servidor",
                        details: error.message
                    });
                }
            }
        };
        this.update = async (req, res) => {
            try {
                const id = String(req.params.id);
                const { error, value } = (0, UpdateIncident_validation_1.validateUpdateIncident)(req.body);
                if (error) {
                    res.status(400).json({
                        mensaje: "Error en la validación",
                        detail: error.details
                    });
                    return;
                }
                const record = await this.updateIncident.execute(id, value);
                res.status(200).json(record);
            }
            catch (error) {
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
        };
        this.delete = async (req, res) => {
            try {
                const id = String(req.params.id);
                await this.deleteIncident.execute(id);
                res.status(200).json({
                    message: "Incidencia eliminada correctamente"
                });
            }
            catch (error) {
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
        };
    }
}
exports.IncidentController = IncidentController;
//# sourceMappingURL=Incident.controller.js.map