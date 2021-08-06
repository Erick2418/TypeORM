import { createValidator} from "express-joi-validation"
import Joi from "joi"

export const validator = createValidator()
 
export const querySchema = Joi.object({
  firstname: Joi.string().required(),
  fecha: Joi.date().required(),
  correo: Joi.string().required(),
  telefono: Joi.string().required(),
  sueldo:  Joi.string().required(),
})
 
