import Joi from "joi"

export  const createUserSchema = Joi.object({
        firstname: Joi.string().required(),
        fecha: Joi.date().required(),
        correo: Joi.string().email().required(),
        telefono: Joi.string().required(),
        sueldo:  Joi.string().required(),
})
export  const updateUserSchema = Joi.object({
        firstname: Joi.string(),
        fecha: Joi.date(),
        correo: Joi.string().email(),
        telefono: Joi.string(),
        sueldo:  Joi.string()
})
