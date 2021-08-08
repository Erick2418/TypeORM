import {Request,Response} from 'express'

import { getRepository } from 'typeorm' //tre un repo o una tabla de una base de datos
import { User } from '../entity/User';

export const getUsers = async (req:Request,res:Response): Promise<Response> => {

    try {
        
        const users =  await getRepository(User).find();//es como hacer un select
        
        return res.json({
            ok:true,
            users
        });
    }catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Conectate al administrador'
        })
    }

}


export const getUser = async (req:Request,res:Response): Promise<Response> => {
    
    const userID:string= req.params.id;

    try {

        const results =  await getRepository(User).findOne(userID);//es como hacer un select
        
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

export const createUser = async (req:Request,res:Response): Promise<Response> => {
    
    const userNew:User=req.body;
    try {

        const newUser= getRepository(User).create(userNew);

        const result = await getRepository(User).save(newUser);

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



export const updateUser = async (req:Request,res:Response): Promise<Response> => {

    const userID:string= req.params.id;
    const userNew:User=req.body;
    try {
        
        const user = await getRepository(User).findOne(userID);
        if(!user){
            return res.status(404).json({
                ok:false,
                msg: ' Usuario no existe con ese ID'
            })
        }

        getRepository(User).merge(user, userNew);

        const results = await getRepository(User).save(user);

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


export const deleteUser = async (req:Request,res:Response): Promise<Response> => {

    const userID:string= req.params.id;

    try {
        const results =  await getRepository(User).delete(userID);//es como hacer un select
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