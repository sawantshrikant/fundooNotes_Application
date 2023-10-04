import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { ForgotAuth } from '../middlewares/auth.middleware';
const router = express.Router();

router.post('', newUserValidator, userController.userRegistration);

router.post('/login', userController.userLogin);

router.post('/forgotPassword', userController.forgotPassword);

router.post('/resetPassword',ForgotAuth,userController.resetPassword);

export default router;

