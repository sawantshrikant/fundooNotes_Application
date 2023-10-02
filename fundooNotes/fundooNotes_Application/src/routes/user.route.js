import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';

const router = express.Router();

router.post('', newUserValidator, userController.userRegistration);

router.post('/login', userController.userLogin);

router.post('/forgotPassword', userController.forgotPassword);

//router.post('/resetPassword', userController.resetPassword);

export default router;
