"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Incident_controller_instance_1 = __importDefault(require("../controllers/Incident.controller.instance"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        await Incident_controller_instance_1.default.findAll(req, res);
    }
    catch (error) {
        res.status(500).json({
            message: "Error en la consulta de incidencias",
            error
        });
    }
});
router.get('/:id', async (req, res) => {
    try {
        await Incident_controller_instance_1.default.findById(req, res);
    }
    catch (error) {
        res.status(500).json({
            message: "Error en la consulta de la incidencia",
            error
        });
    }
});
router.post('/', async (req, res) => {
    try {
        await Incident_controller_instance_1.default.create(req, res);
    }
    catch (error) {
        res.status(500).json({
            message: "Error al crear la incidencia",
            error
        });
    }
});
router.put('/:id', async (req, res) => {
    try {
        await Incident_controller_instance_1.default.update(req, res);
    }
    catch (error) {
        res.status(500).json({
            message: "Error al actualizar la incidencia",
            error
        });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        await Incident_controller_instance_1.default.delete(req, res);
    }
    catch (error) {
        res.status(500).json({
            message: "Error al eliminar la incidencia",
            error
        });
    }
});
exports.default = router;
//# sourceMappingURL=Incident.routes.js.map