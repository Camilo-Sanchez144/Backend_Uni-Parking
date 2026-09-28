import { Router } from 'express';

import IncidentControllerInstance from '../controllers/Incident.controller.instance';

const router = Router();

router.get('/', async (req, res) => {
    try {
        await IncidentControllerInstance.findAll(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Error en la consulta de incidencias",
            error
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        await IncidentControllerInstance.findById(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Error en la consulta de la incidencia",
            error
        });
    }
});

router.post('/', async (req, res) => {
    try {
        await IncidentControllerInstance.create(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Error al crear la incidencia",
            error
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        await IncidentControllerInstance.update(req, res);
    } catch (error) {
        res.status(500).json({
            message: "Error al actualizar la incidencia",
            error
        });
    }
});

router.delete('/:id', async (req, res) => {
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