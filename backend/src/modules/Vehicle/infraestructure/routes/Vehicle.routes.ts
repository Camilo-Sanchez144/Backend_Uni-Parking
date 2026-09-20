import { Router } from 'express';
import VehicleControllerInstance from '../controllers/Vehicle.controller.instance';

const router = Router();

router.get('/', async (req, res) => {
    try {
        await VehicleControllerInstance.findAll(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});

router.get('/deauthorized', async (req, res) => {
    try {
        await VehicleControllerInstance.findDeauthorized(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});

router.get('/:plate', async (req, res) => {
    try {
        await VehicleControllerInstance.findByPlate(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});

router.post('/', async (req, res) => {
    try {
        await VehicleControllerInstance.createVehicle(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el vehículo", error });
    }
});

router.route('/:plate')
    .put(async (req, res) => {
        try {
            await VehicleControllerInstance.update(req, res);
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar el vehículo", error });
        }
    })
    .patch(async (req, res) => {
        try {
            await VehicleControllerInstance.authorize(req, res);
        } catch (error) {
            res.status(500).json({ message: "Error al autorizar el vehículo", error });
        }
    })
    .delete(async (req, res) => {
        try {
            await VehicleControllerInstance.remove(req, res);
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar el vehículo", error });
        }
    });

export default router;