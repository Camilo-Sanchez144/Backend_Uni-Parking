import { Router } from 'express';
import VisitorControllerInstance from '../controllers/Visitor.controller.instance';

const router = Router();

router.post('/', VisitorControllerInstance.create);
router.get('/', VisitorControllerInstance.findAll);
router.get('/:id', VisitorControllerInstance.findById);
router.patch('/:id/exit', VisitorControllerInstance.exit); //<-- borrar

export default router;
