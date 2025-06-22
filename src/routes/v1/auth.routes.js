/**
 - **`POST /auth/register`** → Register user
- **`POST /auth/login`** → Login user
- **`POST /auth/api-key`** → Generate new API key
- **`GET /auth/me`** → Get user profile 
 */

import express from 'express';
import { login, register } from '../../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/register', register);

authRouter.post('/login', login);

export default authRouter;
