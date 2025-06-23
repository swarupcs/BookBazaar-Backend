/**
 - **`POST /auth/register`** → Register user
- **`POST /auth/login`** → Login user
- **`POST /auth/api-key`** → Generate new API key
- **`GET /auth/me`** → Get user profile 
 */

import express from 'express';
import { generateUserApiKey, getUserDetails, login, logout, refreshAccessToken, register } from '../../controllers/auth.controller.js';
import { requireAuth } from '../../middlewares/auth.middleware.js';

const authRouter = express.Router();

authRouter.post('/register', register);

authRouter.post('/login', login);

authRouter.get('/me', requireAuth, getUserDetails);

authRouter.post('/api-key', requireAuth, generateUserApiKey);

// Logs out the user and clears cookies
authRouter.post('/logout', requireAuth, logout);

authRouter.post('/refresh-token', refreshAccessToken);

export default authRouter;
