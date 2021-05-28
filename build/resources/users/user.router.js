import { Router } from 'express';
import usersController from './user.controller.js';
const router = Router();
router.route('/').get(usersController.getAll);
router.route('/').post(usersController.create);
router.route('/:userId').get(usersController.getById);
router.route('/:userId').put(usersController.update);
router.route('/:userId').delete(usersController.deletById);
export default router;
