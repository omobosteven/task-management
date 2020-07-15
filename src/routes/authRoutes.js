import { Router } from 'express';
import AuthController from '../controllers/authController';
import AuthValidation from '../validations/authValidation';

const { registerUser } = AuthController;
const { validateRegisterInput } = AuthValidation;

const auth = Router();

auth.post('/register', validateRegisterInput, registerUser);

export default auth;
