import { Router } from 'express';
import VisitorControllerInstance from '../controllers/VisitorControllerInstance';

const router = Router();

router.post('/', VisitorControllerInstance.create);
router.get('/', VisitorControllerInstance.findAll);
router.get('/:id', VisitorControllerInstance.findById);
router.patch('/:id/authorize', VisitorControllerInstance.authorize);
router.patch('/:id/exit', VisitorControllerInstance.exit);

export default router;
