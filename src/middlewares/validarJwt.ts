import { NextFunction,Request,Response } from 'express';
import jwt from 'jsonwebtoken';
interface IPayload{
    id:string;
    email:string;
    iat:number;
    exp:number;
}
export const validarJwt = (req:Request,res:Response,next:NextFunction)=> {
    
    // x-token   headers
    
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: ' No hay token en la peticion'
        })
    }
   
    try {
        const payload = jwt.verify(token, process.env.TOKER_SECRET || 'tokentest' ) as IPayload; // le mandamos esas props
      
        req.userId = payload.id;
        req.email= payload.email;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        })
    }
    

    next();
    
}
