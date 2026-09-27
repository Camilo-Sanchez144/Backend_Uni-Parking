"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Vehicle_controller_instance_1 = __importDefault(require("../controllers/Vehicle.controller.instance"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        await Vehicle_controller_instance_1.default.findAll(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});
router.get('/deauthorized', async (req, res) => {
    try {
        await Vehicle_controller_instance_1.default.findDeauthorized(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});
router.get('/:plate', async (req, res) => {
    try {
        await Vehicle_controller_instance_1.default.findByPlate(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});
router.post('/', async (req, res) => {
    try {
        await Vehicle_controller_instance_1.default.createVehicle(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear el vehículo", error });
    }
});
router.route('/:plate')
    .put(async (req, res) => {
    try {
        await Vehicle_controller_instance_1.default.update(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar el vehículo", error });
    }
})
    .patch(async (req, res) => {
    try {
        await Vehicle_controller_instance_1.default.authorize(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Error al autorizar el vehículo", error });
    }
})
    .delete(async (req, res) => {
    try {
        await Vehicle_controller_instance_1.default.remove(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar el vehículo", error });
    }
});
exports.default = router;
//# sourceMappingURL=Vehicle.routes.js.map