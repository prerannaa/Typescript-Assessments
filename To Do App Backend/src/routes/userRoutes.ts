import { Router } from 'express';
import * as userController from '../controller/userController';

const router = Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/refresh-token', userController.refreshAccessToken);

export default router;
