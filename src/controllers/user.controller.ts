import {Request,Response} from 'express'
import { getRepository } from 'typeorm' //tre un repo o una tabla de una base de datos
import { User } from '../entity/User';



export const getUsers = async (req:Request,res:Response): Promise<Response> => {

    const users =  await getRepository(User).find();//es como hacer un select

    return res.json(users);

}


export const getUser = async (req:Request,res:Response): Promise<Response> => {

    const results =  await getRepository(User).findOne(req.params.id);//es como hacer un select

    return res.json(results);

}



export const createUser = async (req:Request,res:Response): Promise<Response> => {
    
    const newUser= getRepository(User).create(req.body);

    const result = await getRepository(User).save(newUser);

    return res.json(result);

}



export const updateUser = async (req:Request,res:Response): Promise<Response> => {
    
    const user = await getRepository(User).findOne(req.params.id);
    if(user){
        
       getRepository(User).merge(user, req.body);

       const results = await getRepository(User).save(user);
        return res.json(results);
    }
    return res.status(404).json({msg:'not user found'});

}


export const deleteUser = async (req:Request,res:Response): Promise<Response> => {

    const results =  await getRepository(User).delete(req.params.id);//es como hacer un select

    return res.json(results);

}

