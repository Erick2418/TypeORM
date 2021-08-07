import Joi from "joi"

export  const shemaAuth = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
})
// export  const updateUserNewSchema = Joi.object({
//         correo: Joi.string().email(),
//         password: Joi.string()
// })
