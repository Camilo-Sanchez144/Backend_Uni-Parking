import { Router } from 'express';
import AccessRecordControllerInstance from '../controllers/AccessRecord.controller.instance';

const router = Router();

router.get('/records/open', async (req, res) => {
        try {
            await AccessRecordControllerInstance.findOpenRecords(req, res);
        } catch (error) {
            res.status(500).json({
                message: "Error en la consulta de registros abiertos"
            });
        }
    }
);

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
router.post('/entry/visitor/:visitorId', async (req, res) => {
        try {
            await AccessRecordControllerInstance.registerEntryVisitor(req, res);
        } catch (error) {
            res.status(500).json({
                message: "Error en la ruta de ingreso"
            });
        }
    }
);

router.patch('/exit/visitor/:visitorId', async (req, res) => {
        try {
            await AccessRecordControllerInstance.registerExitVisitor(req, res);
        } catch (error) {
            res.status(500).json({
                message: "Error en la ruta de salida"
            });
        }
    }
);


export default router;