"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_controller_instance_1 = __importDefault(require("../controllers/User.controller.instance"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        await User_controller_instance_1.default.findAll(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});
router.get('/:userId', async (req, res) => {
    try {
        await User_controller_instance_1.default.findById(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});
router.get('/unactive', async (req, res) => {
    try {
        await User_controller_instance_1.default.getUsersUnactive(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});
router.post('/', async (req, res) => {
    try {
        await User_controller_instance_1.default.createUser(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});
router.put('/:userId', async (req, res) => {
    try {
        await User_controller_instance_1.default.activeUser(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});
router.delete('/', async (req, res) => {
    try {
        await User_controller_instance_1.default.deleteUserById(req, res);
    }
    catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});
exports.default = router;
//# sourceMappingURL=User.routes.js.map