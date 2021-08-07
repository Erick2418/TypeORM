import {Router} from 'express'
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controller';
import { validarUserSchema } from '../middlewares/validarSchema';
import { createUserSchema, updateUserSchema } from '../schemas/user.schemas';

const router = Router();

router.get('/users',getUsers);
router.get('/users/:id',getUser);
router.post('/users',validarUserSchema(createUserSchema),createUser);
router.put('/users/:id',validarUserSchema(updateUserSchema),updateUser);
router.delete('/users/:id',deleteUser);

export default router;
