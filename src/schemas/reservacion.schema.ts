import Joi from "joi"


export  const createReservacionSchema = Joi.object({
    fecha_entrada: Joi.date().required(),
    fecha_salida: Joi.date().required(),
    costo:Joi.number().precision(5).required(),
    num_habitacion: Joi.number().required(),
    cliente:  Joi.string().required(),
})

export  const updateReservacionSchema = Joi.object({
    fecha_entrada: Joi.date(),
    fecha_salida: Joi.date(),
    costo:Joi.number().precision(5),
    num_habitacion: Joi.number(),
    cliente:  Joi.string(),
  
    
})

