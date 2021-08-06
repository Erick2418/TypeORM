import {Router} from 'express'
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controller';
import { querySchema, validator } from '../schemas/user.schemas';


const router = Router();

router.get('/users',getUsers);
router.get('/users/:id',getUser);
router.post('/users',validator.body(querySchema),createUser);
router.put('/users/:id',updateUser);
router.delete('/users/:id',deleteUser);

export default router;



