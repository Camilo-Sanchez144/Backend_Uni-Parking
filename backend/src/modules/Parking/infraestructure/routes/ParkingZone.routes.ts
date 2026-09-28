import { Router } from 'express';
import { authorize, validatePermission } from '../../../../shared/middleware/authorize';
import parkingZoneControllerIntance from '../controllers/ParkingZone.controller.instance';

// Cada ruta exige su permiso; la lista completa está en shared/config/seedPermission.ts.
const router = Router();

router.post('/', authorize(validatePermission, 'parking-zone:create'), async (req, res) => {
    try {
        await parkingZoneControllerIntance.createParkingZone(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Error en la ruta de ingreso"
        });
    }
});

router.get('/', authorize(validatePermission, 'parking-zone:read'), async (req, res) => {
    try {
        await parkingZoneControllerIntance.getAllParkingZone(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Error en la ruta de salida"
        });
    }
});
router.patch('/:idParkingZone', authorize(validatePermission, 'parking-zone:update'), async (req, res) => {
    try {
        await parkingZoneControllerIntance.updateParkingZone(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Error en la ruta de ingreso"
        });
    }
});

router.get('/:typeVehicle', authorize(validatePermission, 'parking-zone:read-by-type'), async (req, res) => {
    try {
        await parkingZoneControllerIntance.findParkingZoneByVehicleType(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Error en la ruta de salida"
        });
    }
});


export default router;