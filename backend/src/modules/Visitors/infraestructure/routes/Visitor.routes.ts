import { Router } from 'express';
import VisitorControllerInstance from '../controllers/Visitor.controller.instance';
import { authorize, validatePermission } from '../../../../shared/middleware/authorize';

// Cada ruta exige su permiso; la lista completa está en shared/config/seedPermission.ts.
const router = Router();

// Pública a propósito: el visitante llena el formulario sin tener cuenta.
router.post('/', VisitorControllerInstance.create);
router.get('/', authorize(validatePermission, 'visitor:read'), VisitorControllerInstance.findAll);
router.get('/:id', authorize(validatePermission, 'visitor:read-one'), VisitorControllerInstance.findById);
router.patch('/:id/exit', authorize(validatePermission, 'visitor:exit'), VisitorControllerInstance.exit); //<-- borrar

export default router;
