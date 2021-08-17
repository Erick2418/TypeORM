import { Request, Response, NextFunction } from 'express';
import { Cliente } from '../entity';
import { Schema } from 'joi';

export const validarClienteSchema= (schema: Schema)=>{
    return  async (req:Request,res:Response,next:NextFunction) => {
        const cliente:Cliente = req.body;
        try{
            await schema.validateAsync(cliente);
            next();
        }catch (error) {
            return res.status(400).json({
                ok:false,
                msg: error+""
            })
        }
    }
    
}

