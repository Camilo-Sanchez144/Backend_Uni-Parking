import { Router } from 'express';
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

router.get('/', async (req, res) => {
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