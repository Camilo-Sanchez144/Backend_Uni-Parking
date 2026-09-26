"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleController = void 0;
const CreateVehicle_validation_1 = require("../validations/CreateVehicle.validation");
const UpdateVehicle_validation_1 = require("../validations/UpdateVehicle.validation");
class VehicleController {
    constructor(addVehicle, authorizeVehicle, deauthorizeVehicle, getAllVehicles, getVehicleByPlate, getVehiclesDeauthorized, updateVehicle) {
        this.addVehicle = addVehicle;
        this.authorizeVehicle = authorizeVehicle;
        this.deauthorizeVehicle = deauthorizeVehicle;
        this.getAllVehicles = getAllVehicles;
        this.getVehicleByPlate = getVehicleByPlate;
        this.getVehiclesDeauthorized = getVehiclesDeauthorized;
        this.updateVehicle = updateVehicle;
        this.createVehicle = async (req, res) => {
            try {
                const { error, value } = (0, CreateVehicle_validation_1.validateCreateVehicle)(req.body);
                if (error) {
                    res.status(400).json({ mensaje: 'Error en la validación', detail: error.details });
                    return;
                }
                const record = await this.addVehicle.execute(value);
                res.status(201).json(record);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).json({ error: "Error interno del servidor", details: err.message });
                }
            }
        };
        this.authorize = async (req, res) => {
            try {
                const plate = String(req.params.plate);
                await this.authorizeVehicle.execute(plate);
                res.status(200).json({ message: 'vehículo autorizado' });
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
        this.remove = async (req, res) => {
            try {
                const plate = String(req.params.plate);
                await this.deauthorizeVehicle.execute(plate);
                res.status(200).json({ message: 'vehículo desautorizado' });
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
                const vehicles = await this.getAllVehicles.execute();
                res.status(200).json(vehicles);
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
        this.findByPlate = async (req, res) => {
            try {
                const plate = String(req.params.plate);
                const vehicle = await this.getVehicleByPlate.execute(plate);
                if (!vehicle) {
                    res.status(404).json({ message: "Vehículo no encontrado" });
                    return;
                }
                res.status(200).json(vehicle);
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
        this.findDeauthorized = async (req, res) => {
            try {
                const vehicles = await this.getVehiclesDeauthorized.execute();
                res.status(200).json(vehicles);
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
                const plate = String(req.params.plate);
                const { error, value } = (0, UpdateVehicle_validation_1.validateUpdateVehicle)(req.body);
                if (error) {
                    res.status(400).json({ mensaje: 'Error en la validación', detail: error.details });
                    return;
                }
                const record = await this.updateVehicle.execute(plate, value);
                res.status(200).json(record);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).json({ error: "Error interno del servidor", details: err.message });
                }
            }
        };
    }
}
exports.VehicleController = VehicleController;
//# sourceMappingURL=Vehicle.controller.js.map