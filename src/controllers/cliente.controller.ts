import {Request,Response} from 'express'

import { getRepository } from 'typeorm' //tre un repo o una tabla de una base de datos
import { Cliente } from '../entity/Cliente';
import bcrypt from 'bcryptjs';
import { generarJWT } from '../helpers/jwt';

export const getClientes = async (req:Request,res:Response): Promise<Response> => {

    try {
        
        const users =  await getRepository(Cliente).find();//es como hacer un select
        
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


export const getCliente = async (req:Request,res:Response): Promise<Response> => {
    
    const userID:string= req.params.id;

    try {


        const results =  await getRepository(Cliente).findOne(userID);//es como hacer un select
        
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

export const createCliente = async (req:Request,res:Response): Promise<Response> => {
    

    const {email,password}:Cliente= req.body;

            
    const emailExist =  await getRepository(Cliente).findOne({email});
        
    if(emailExist!=undefined){

            return res.status(400).json({
                ok:false,
                msg: 'email exist'// cambiar por "Email o Password Incorrecto"
            })
        }
     
    const userNew:Cliente=req.body;

    const salt= bcrypt.genSaltSync();

    userNew.password= bcrypt.hashSync(password,salt);






    try {

        const newUser= getRepository(Cliente).create(userNew);

        const result = await getRepository(Cliente).save(newUser);

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



export const updateCliente = async (req:Request,res:Response): Promise<Response> => {



    const {password}:Cliente= req.body;

     
    const userNew:Cliente=req.body;

    const salt= bcrypt.genSaltSync();

    userNew.password= bcrypt.hashSync(password,salt);

    const userID:string= req.params.id;
  
    try {
        
        const user = await getRepository(Cliente).findOne(userID);
        if(!user){
            return res.status(404).json({
                ok:false,
                msg: ' Usuario no existe con ese ID'
            })
        }

        getRepository(Cliente).merge(user, userNew);

        const results = await getRepository(Cliente).save(user);

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


export const deleteCliente = async (req:Request,res:Response): Promise<Response> => {

    const userID:string= req.params.id;

    try {
        const results =  await getRepository(Cliente).delete(userID);//es como hacer un select
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



export const loginClienteAuth = async (req:Request,res:Response): Promise<Response> => {
    
    const {email,password}:Cliente= req.body;

    try {
        
        const emailExist =  await getRepository(Cliente).findOne({email});
        console.log(emailExist);
        if(emailExist?.email==undefined){

            return res.status(400).json({
                ok:false,
                msg: 'email incorrecto'// cambiar por "Email o Password Incorrecto"
            })
        }
           
        //confirmamos password
        const validPassword= bcrypt.compareSync(password, emailExist.password);
            console.log(validPassword);
        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: ' password incorrecto'// cambiar por "Email o Password Incorrecto"
            })
        }

        //GENERAR JWT
        const token =  await generarJWT(emailExist.id+"",emailExist.email)

        return res.status(201).json({
            ok:true,
            id:emailExist.id,
            user:emailExist.email,
            token
        })

    }catch (error) {
        return res.status(500).json({
            ok:false,
            msg: 'Conectate al administrador'
        })
    }
}




