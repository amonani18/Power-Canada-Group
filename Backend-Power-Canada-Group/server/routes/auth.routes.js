import express from 'express';
import authCtrl from '../controllers/auth.controller.js';


const router = express.Router();

router.route('/signin').post(authCtrl.signin);  

export default router;
