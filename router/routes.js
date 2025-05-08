import express from 'express';
import { authController, loginController } from '../Controller/authController.js';

const router = express.Router();

// POST: /api/signup
router.post('/signup', authController);

// POST: /api/login
router.post('/login', loginController);

export default router;
