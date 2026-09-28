import { Router } from 'express';
import UserControllerInstance from '../controllers/User.controller.instance';

const router = Router();

router.get('/', async (req, res) => {
    try {
        await UserControllerInstance.findAll(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});
router.get('/unactive', async (req, res) => {
    try {
        await UserControllerInstance.getUsersUnactive(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});
router.get('/:userId', async (req, res) => {
    try {
        await UserControllerInstance.findById(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});
router.post('/', async (req, res) => {
    try {
        await UserControllerInstance.createUser(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});
router.put('/:userId', async (req, res) => {
    try {
        await UserControllerInstance.activeUser(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});
router.delete('/:userId', async (req, res) => {
    try {
        await UserControllerInstance.deleteUserById(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});

export default router;