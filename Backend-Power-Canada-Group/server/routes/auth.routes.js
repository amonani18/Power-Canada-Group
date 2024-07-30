import express from 'express';
// Change this to use named imports
import { signin } from '../controllers/auth.controller.js';

const router = express.Router();

// Use the imported named function directly
router.route('/signin').post(signin);  

export default router;
