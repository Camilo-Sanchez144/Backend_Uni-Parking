import { Router } from 'express';
import AccessRecordControllerInstance from '../controllers/AccessRecord.controller.instance';
import { authorize, validatePermission } from '../../../../shared/middleware/authorize';

// Cada ruta exige su permiso; la lista completa está en shared/config/seedPermission.ts.
const router = Router();

router.get('/records/open', authorize(validatePermission, 'access-record:read-open'), async (req, res) => {
        try {
            await AccessRecordControllerInstance.findOpenRecords(req, res);
        } catch (error) {
            res.status(500).json({
                message: "Error en la consulta de registros abiertos"
            });
        }
    }
);

router.get('/records/open/count', authorize(validatePermission, 'access-record:read-open-count'), async (req, res) => {
        try {
            await AccessRecordControllerInstance.findOpenRecordsCount(req, res);
        } catch (error) {
            res.status(500).json({
                message: "Error en la consulta de registros abiertos"
            });
        }
    }
);

router.post('/entry/:plate', authorize(validatePermission, 'access-record:entry'), async (req, res) => {
    try {
        await AccessRecordControllerInstance.registerEntryVehicle(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Error en la ruta de ingreso"
        });
    }
});
router.get('/status/:plate', authorize(validatePermission, 'vehicle:status'), async (req, res) => {
    try {
        await AccessRecordControllerInstance.getVehicleStatus(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Error en la ruta de ingreso"
        });
    }
});
router.get('/historical/:plate', authorize(validatePermission, 'access-record:historical'), async (req, res) => {
    try {
        await AccessRecordControllerInstance.getVehiclehistoricalByPlate(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Error en la ruta de ingreso"
        });
    }
});
router.patch('/exit/:plate', authorize(validatePermission, 'access-record:exit'), async (req, res) => {
    try {
        await AccessRecordControllerInstance.registerExitVehicle(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Error en la ruta de salida"
        });
    }
});
router.post('/entry/visitor/:visitorId', authorize(validatePermission, 'access-record:visitor-entry'), async (req, res) => {
    try {
        await AccessRecordControllerInstance.registerEntryVisitor(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Error en la ruta de ingreso"
        });
    }
});

router.patch('/exit/visitor/:visitorId', authorize(validatePermission, 'access-record:visitor-exit'), async (req, res) => {
    try {
        await AccessRecordControllerInstance.registerExitVisitor(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Error en la ruta de salida"
        });
    }
});


export default router;

