import Joi from "joi"

export  const querySchema = Joi.object({
        firstname: Joi.string().required(),
        fecha: Joi.date().required(),
        correo: Joi.string().email().required(),
        telefono: Joi.string().required(),
        sueldo:  Joi.string().required(),
})