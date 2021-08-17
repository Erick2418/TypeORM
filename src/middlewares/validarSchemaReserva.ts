import { Request, Response, NextFunction } from 'express';
import { Reservacion } from '../entity';
import { Schema } from 'joi';

export const validarReservacionSchema= (schema: Schema)=>{
    return  async (req:Request,res:Response,next:NextFunction) => {
        const reservacion:Reservacion = req.body;
        try{
            await schema.validateAsync(reservacion);
            next();
        }catch (error) {
            return res.status(400).json({
                ok:false,
                msg: error+""
            })
        }
    }
    
}
