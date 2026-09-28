import { validatePermission } from './../../../../shared/middleware/authorize';
import { Router } from 'express';
import { authorize } from '../../../../shared/middleware/authorize';
import parkingZoneControllerIntance from '../controllers/ParkingZone.controller.instance';
const router = Router();

router.post('/', async (req, res) => {
    try {
        await parkingZoneControllerIntance.createParkingZone(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Error en la ruta de ingreso"
        });
    }
});

router.get('/', authorize(validatePermission, 'vehicle:status'), async (req, res) => {
    try {
        await parkingZoneControllerIntance.getAllParkingZone(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Error en la ruta de salida"
        });
    }
});
router.patch('/:idParkingZone', async (req, res) => {
    try {
        await parkingZoneControllerIntance.updateParkingZone(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Error en la ruta de ingreso"
        });
    }
});

router.get('/:typeVehicle', async (req, res) => {
    try {
        await parkingZoneControllerIntance.findParkingZoneByVehicleType(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Error en la ruta de salida"
        });
    }
});


export default router;