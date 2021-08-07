/**
 Rutas de usuarios /AUTH
 host + /api/auth
 */
import {Router} from 'express'
import { createUserAuth, loginUserAuth } from '../controllers/auth.controller';
import { validarShemaAuth } from '../middlewares/validarShemaAuth';
import { shemaAuth } from '../schemas/auth.shemas';


const router = Router();

    router.post('/new',validarShemaAuth(shemaAuth),createUserAuth);
    router.post('/',validarShemaAuth(shemaAuth),loginUserAuth);

export default router;
