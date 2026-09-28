import { Router } from 'express';
import UserControllerInstance from '../controllers/User.controller.instance';
import { authorize, validatePermission } from '../../../../shared/middleware/authorize';

// Cada ruta exige su permiso; la lista completa está en shared/config/seedPermission.ts.
const router = Router();

router.get('/', authorize(validatePermission, 'user:read'), async (req, res) => {
    try {
        await UserControllerInstance.findAll(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});
router.get('/unactive', authorize(validatePermission, 'user:read-inactive'), async (req, res) => {
    try {
        await UserControllerInstance.getUsersUnactive(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});
router.get('/:userId', authorize(validatePermission, 'user:read-one'), async (req, res) => {
    try {
        await UserControllerInstance.findById(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});
// Pública a propósito: quien se registra todavía no tiene rol, se le asigna aquí.
// El controlador sí exige un token válido de Firebase.
router.post('/', async (req, res) => {
    try {
        await UserControllerInstance.createUser(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});
router.patch('/:userId/role', authorize(validatePermission, 'user:change-role'), async (req, res) => {
    try {
        await UserControllerInstance.changeRole(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error al cambiar el rol", error });
    }
});
router.put('/:userId', authorize(validatePermission, 'user:restore'), async (req, res) => {
    try {
        await UserControllerInstance.activeUser(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});
router.delete('/:userId', authorize(validatePermission, 'user:deactivate'), async (req, res) => {
    try {
        await UserControllerInstance.deleteUserById(req, res);
    } catch (error) {
        res.status(500).json({ message: "Error en la consulta de datos", error });
    }
});

export default router;