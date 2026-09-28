import { Router } from 'express';
import VehicleControllerInstance from '../controllers/Vehicle.controller.instance';
import { authorize, validatePermission } from '../../../../shared/middleware/authorize';

// Cada ruta exige su permiso; la lista completa está en shared/config/seedPermission.ts.
const router = Router();

router.get('/', authorize(validatePermission, 'vehicle:read'), async (req, res) => {
    try {
        await VehicleControllerInstance.findAll(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});

router.get('/deauthorized', authorize(validatePermission, 'vehicle:read-deauthorized'), async (req, res) => {
    try {
        await VehicleControllerInstance.findDeauthorized(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});

router.get('/:plate', authorize(validatePermission, 'vehicle:read-one'), async (req, res) => {
    try {
        await VehicleControllerInstance.findByPlate(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});

router.post('/', authorize(validatePermission, 'vehicle:create'), async (req, res) => {
    try {
        await VehicleControllerInstance.createVehicle(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el vehículo", error });
    }
});

router.route('/:plate')
    .put(authorize(validatePermission, 'vehicle:update'), async (req, res) => {
        try {
            await VehicleControllerInstance.update(req, res);
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar el vehículo", error });
        }
    })
    .patch(authorize(validatePermission, 'vehicle:authorize'), async (req, res) => {
        try {
            await VehicleControllerInstance.authorize(req, res);
        } catch (error) {
            res.status(500).json({ message: "Error al autorizar el vehículo", error });
        }
    })
    .delete(authorize(validatePermission, 'vehicle:deauthorize'), async (req, res) => {
        try {
            await VehicleControllerInstance.remove(req, res);
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar el vehículo", error });
        }
    });

export default router;