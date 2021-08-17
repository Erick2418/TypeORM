import Joi from "joi"

export  const shemaAuth = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
})


