import { Router } from 'express';

import IncidentControllerInstance from '../controllers/Incident.controller.instance';
import { authorize, validatePermission } from '../../../../shared/middleware/authorize';

// Cada ruta exige su permiso; la lista completa está en shared/config/seedPermission.ts.
const router = Router();

router.get('/', authorize(validatePermission, 'incident:read'), async (req, res) => {
    try {
        await IncidentControllerInstance.findAll(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Error en la consulta de incidencias",
            error
        });
    }
});

router.get('/:id', authorize(validatePermission, 'incident:read-one'), async (req, res) => {
    try {
        await IncidentControllerInstance.findById(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Error en la consulta de la incidencia",
            error
        });
    }
});

router.post('/', authorize(validatePermission, 'incident:create'), async (req, res) => {
    try {
        await IncidentControllerInstance.create(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Error al crear la incidencia",
            error
        });
    }
});

router.put('/:id', authorize(validatePermission, 'incident:update'), async (req, res) => {
    try {
        await IncidentControllerInstance.update(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar la incidencia",
            error
        });
    }
});

router.delete('/:id', authorize(validatePermission, 'incident:delete'), async (req, res) => {
    try {
        await IncidentControllerInstance.delete(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Error al eliminar la incidencia",
            error
        });
    }
});

export default router;