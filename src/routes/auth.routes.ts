/**
 Rutas de usuarios /AUTH
 host + /api/auth
 */
import {Router} from 'express'
import { createUserAuth } from '../controllers/auth.controller';
import { validarShemaAuth } from '../middlewares/validarShemaAuth';
import { shemaAuth } from '../schemas/auth.shemas';


const router = Router();

// router.get('/',getUsersAut);
 router.post('/new',validarShemaAuth(shemaAuth),createUserAuth);
// router.post('/auth/:id',validarUserSchema(),);

export default router;
