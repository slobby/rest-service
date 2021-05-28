import { Router } from 'express';
import boardsController from './board.controller.js';

const router: Router = Router();

router.route('/').get(boardsController.getAll);

router.route('/').post(boardsController.create);

router.route('/:boardId').get(boardsController.getById);

router.route('/:boardId').put(boardsController.update);

router.route('/:boardId').delete(boardsController.deletById);

export default router;
