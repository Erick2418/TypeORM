
import {Router} from 'express'
import { createReservacion, deleteReservacion, getReservacion, getReservaciones, updateReservacion } from '../controllers/reservacion.controller';
import { validarReservacionSchema } from '../middlewares/validarSchemaReserva';

import { validarJwt } from '../middlewares/validarJwt';

import { createReservacionSchema, updateReservacionSchema } from '../schemas/reservacion.schema';

const router = Router();

router.use(validarJwt);

router.get('/',getReservaciones);

router.get('/:id',getReservacion);

router.post('/',validarReservacionSchema(createReservacionSchema),createReservacion);

router.put('/:id',validarReservacionSchema(updateReservacionSchema),updateReservacion);

router.delete('/:id',deleteReservacion);

export default router;
