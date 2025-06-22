/**
 - **`POST /auth/register`** → Register user
- **`POST /auth/login`** → Login user
- **`POST /auth/api-key`** → Generate new API key
- **`GET /auth/me`** → Get user profile 
 */

import express from 'express';
import { getUserDetails, login, register } from '../../controllers/auth.controller.js';
import { requireAuth } from '../../middlewares/auth.middleware.js';

const authRouter = express.Router();

authRouter.post('/register', register);

authRouter.post('/login', login);

authRouter.get('/me', requireAuth, getUserDetails);

export default authRouter;
