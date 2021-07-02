import { Router } from 'express';
import logerController from './login.controller.js';

const router: Router = Router();

router.route('/').post(logerController.getJWT);

export default router;
