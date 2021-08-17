import Joi from "joi"

export  const createClienteSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        name: Joi.string().required(),
        fecha_nacimiento: Joi.date().required(),
        cedula:  Joi.string().required(),
        cellphone:Joi.string().required(),
})

export  const loginClienteSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
})

export  const updateClienteSchema = Joi.object({
        email: Joi.string().email(),
        password: Joi.string(),
        name: Joi.string(),
        fecha_nacimiento: Joi.date(),
        cedula:  Joi.string(),
        cellphone:Joi.string(),
})
