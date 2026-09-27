import { Router } from 'express';
import AccessRecordControllerInstance from '../controllers/AccessRecord.controller.instance';

const router = Router();

router.post('/entry/:plate', async (req, res) => {
        try {
            await AccessRecordControllerInstance.registerEntryVehicle(req, res);
        } catch (error) {
            res.status(500).json({
                message: "Error en la ruta de ingreso"
            });
        }
    }
);

router.patch('/exit/:plate', async (req, res) => {
        try {
            await AccessRecordControllerInstance.registerExitVehicle(req, res);
        } catch (error) {
            res.status(500).json({
                message: "Error en la ruta de salida"
            });
        }
    }
);

export default router;