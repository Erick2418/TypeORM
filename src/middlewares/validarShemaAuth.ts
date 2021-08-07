import { Request, Response, NextFunction } from 'express';
import { Auth } from '../entity';
import { Schema } from 'joi';

export const validarShemaAuth= (schema: Schema)=>{
    return  async (req:Request,res:Response,next:NextFunction) => {
        const user:Auth = req.body;
        try{
            await schema.validateAsync(user);
            next();
        }catch (error) {
            return res.status(400).json({
                ok:false,
                msg: error+""
            })
        }
    }
    
}
