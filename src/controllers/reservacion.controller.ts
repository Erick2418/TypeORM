import {Request,Response} from 'express'

import { getRepository } from 'typeorm' //tre un repo o una tabla de una base de datos
import { Reservacion } from '../entity/Reservacion';
import { Cliente } from '../entity/Cliente';

export const getReservaciones = async (req:Request,res:Response): Promise<Response> => {

    try {
        
        const reservacion =  await getRepository(Reservacion).find();//es como hacer un select
        return res.json({
            ok:true,
            reservacion
        });
    }catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Conectate al administrador'
        })
    }

}


export const getReservacion = async (req:Request,res:Response): Promise<Response> => {
    
    const reservID:string= req.params.id;

    try {

        const results =  await getRepository(Reservacion).findOne(reservID);//es como hacer un select
        
        if(!results){
            return res.status(404).json({
                ok:false,
                msg: ' Usuario no existe con ese ID'
            })
        }
        return res.json({
            ok:true,
            results
        });
 
        }catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Conectate al administrador'
        })
    }
}

export const createReservacion = async (req:Request,res:Response): Promise<Response> => {
    
    const userNew:Reservacion=req.body;


    const user = await getRepository(Cliente).findOne(userNew.cliente);
    if(!user){
        return res.status(404).json({
            ok:false,
            msg: ' Cliente no existe con ese ID'
        })
    }

    try {

        const newUser= getRepository(Reservacion).create(userNew);

        const result = await getRepository(Reservacion).save(newUser);

        return res.json({
            ok:true,
            user:result
        })
        }catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Conectate al administrador'
        })
    }
}



export const updateReservacion = async (req:Request,res:Response): Promise<Response> => {

    const reservacionID:string= req.params.id;
    const reservaNew:Reservacion=req.body;
    try {
        
        const user = await getRepository(Reservacion).findOne(reservacionID);
        if(!user){
            return res.status(404).json({
                ok:false,
                msg: ' Usuario no existe con ese ID'
            })
        }

        getRepository(Reservacion).merge(user, reservaNew);

        const results = await getRepository(Reservacion).save(user);

        return res.json({
            ok:true,
            usuario:results
        });

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Conectate al administrador'
        })
    }
    
}


export const deleteReservacion = async (req:Request,res:Response): Promise<Response> => {

    const reservaID:string= req.params.id;

    try {
        const results =  await getRepository(Reservacion).delete(reservaID);//es como hacer un select
    //    console.log(results.affected) ;
        if(results.affected==0){
            return res.status(404).json({
                ok:false,
                msg: ' Usuario no existe con ese ID'
            })
        }
        return res.json({
            ok:true,
            msg: ' Usuario eliminado con exito'
        });
    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Conectate al administrador'
        })
    }    

}