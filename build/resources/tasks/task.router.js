import { Router } from 'express';
import tasksController from './task.controller.js';
const router = Router({ mergeParams: true });
router.route('/').get(tasksController.getAll);
router.route('/').post(tasksController.create);
router.route('/:taskId').get(tasksController.getById);
router.route('/:taskId').put(tasksController.update);
router.route('/:taskId').delete(tasksController.deletById);
export default router;
