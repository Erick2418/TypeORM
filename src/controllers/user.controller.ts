import {Request,Response} from 'express'

import { getRepository } from 'typeorm' //tre un repo o una tabla de una base de datos
import { User } from '../entity/User';
import { querySchema } from '../schemas/user.schemas';




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
            msg: 'hable con el admin'
        })
    }

}


export const getUser = async (req:Request,res:Response): Promise<Response> => {
    
    try {

    const results =  await getRepository(User).findOne(req.params.id);//es como hacer un select

    return res.json({
        ok:true,
        results
    })


    }catch (error) {
    return res.status(500).json({
        ok:false,
        msg: 'hable con el admin'
    })
}
}

export const createUser = async (req:Request,res:Response): Promise<Response> => {
    
    // const {error}= shema(req.body);
    let bandera:boolean = false;
    try{
        await querySchema.validateAsync(req.body);
        
        
    }catch (error) {
        return res.json({
            ok:true,
            user:error+""
        })
    }


    if(bandera){
        const newUser= getRepository(User).create(req.body);
        const result = await getRepository(User).save(newUser);
        return res.json({
            ok:true,
            user:result
        })
    }
    else{
        return res.status(500).json({
            ok:false,
            msg: "habla con el admin"
        })
    }
    // try {

    //     const newUser= getRepository(User).create(req.body);

    //     const result = await getRepository(User).save(newUser);

    //     return res.json({
    //         ok:true,
    //         user:result
    //     })
    //     }catch (error) {
    //     return res.status(500).json({
    //         ok:false,
    //         msg: 'hable con el admin'
    //     })
    // }
}



export const updateUser = async (req:Request,res:Response): Promise<Response> => {
    try {

        const user = await getRepository(User).findOne(req.params.id);

        if(!user){
            return res.status(404).json({
                ok:false,
                msg: ' Usuario no existe con ese ID'
            })
        }

        getRepository(User).merge(user, req.body);

        const results = await getRepository(User).save(user);

        return res.json({
            ok:true,
            usuario:results
        });

    } catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
    
}


export const deleteUser = async (req:Request,res:Response): Promise<Response> => {

    const results =  await getRepository(User).delete(req.params.id);//es como hacer un select

    return res.json(results);

}

