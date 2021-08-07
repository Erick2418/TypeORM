/**
 Rutas de usuarios /AUTH
 host + /api/user
 */

import {Router} from 'express'
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controller';
import { validarUserSchema } from '../middlewares/validarSchema';
import { createUserSchema, updateUserSchema } from '../schemas/user.schemas';

const router = Router();

router.get('/',getUsers);
router.get('/:id',getUser);
router.post('/',validarUserSchema(createUserSchema),createUser);
router.put('/:id',validarUserSchema(updateUserSchema),updateUser);
router.delete('/:id',deleteUser);

export default router;
