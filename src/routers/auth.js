import { Router } from 'express';
import { validateBody } from '../middlewars/validateBody.js';
import { loginUserSchema, regiterUserSchema } from '../validation/auth.js';
import { loginUserController, logoutUserController, refreshUserSessionController, registerUserController } from '../controllers/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

router.post('/register', validateBody(regiterUserSchema), ctrlWrapper(registerUserController));
router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController));
router.post('/logout', ctrlWrapper(logoutUserController));
router.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default router;
