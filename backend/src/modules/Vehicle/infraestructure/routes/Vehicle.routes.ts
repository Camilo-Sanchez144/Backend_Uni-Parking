import { Router } from 'express';
import VehicleControllerInstance from '../controllers/Vehicle.controller.instance';

const router = Router();

router.get('/', VehicleControllerInstance.findAll);
router.get('/deauthorized', VehicleControllerInstance.findDeauthorized);
router.get('/:plate', VehicleControllerInstance.findByPlate);
router.post('/', VehicleControllerInstance.createVehicle);

router.route('/:plate')
    .put(VehicleControllerInstance.update)
    .patch(VehicleControllerInstance.authorize)   
    .delete(VehicleControllerInstance.remove);

export default router;