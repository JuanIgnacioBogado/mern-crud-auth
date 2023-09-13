import { Router } from 'express';

import { login, logout, register, refreshToken } from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.middleware.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { loginSchema, registerSchema } from '../schemas/auth.schema.js';

const router = Router();

// public
router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);

// private
router.get('/refresh-token', authRequired, refreshToken);

export default router;
