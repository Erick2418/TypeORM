// /**
//  Rutas de usuarios /AUTH
//  host + /api/user
//  */
import {Router} from 'express'
import { createReservacion, deleteReservacion, getReservacion, getReservaciones, updateReservacion } from '../controllers/reservacion.controller';
import { validarReservacionSchema } from '../middlewares/validarSchemaReserva';
// import { createUser, deleteUser, getUser, getUsers, updateUser } from '../controllers/user.controller';
import { validarJwt } from '../middlewares/validarJwt';
// import { validarUserSchema } from '../middlewares/validarSchema';
// import { createUserSchema, updateUserSchema } from '../schemas/user.schemas';
import { createReservacionSchema, updateReservacionSchema } from '../schemas/reservacion.schema';

const router = Router();

router.use(validarJwt);

router.get('/',getReservaciones);

router.get('/:id',getReservacion);

router.post('/',validarReservacionSchema(createReservacionSchema),createReservacion);

router.put('/:id',validarReservacionSchema(updateReservacionSchema),updateReservacion);

router.delete('/:id',deleteReservacion);

export default router;
