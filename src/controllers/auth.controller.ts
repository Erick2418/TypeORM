import {Request,Response} from 'express'

import { getRepository } from 'typeorm' //tre un repo o una tabla de una base de datos
import { Auth } from '../entity/Auth';
import bcrypt from 'bcryptjs';

import { generarJWT } from '../helpers/jwt';

export const loginUserAuth = async (req:Request,res:Response): Promise<Response> => {
    
    const {email,password}:Auth= req.body;

    try {
        
        const emailExist =  await getRepository(Auth).findOne({email});

        if(emailExist?.email==undefined){

            return res.status(400).json({
                ok:false,
                msg: 'email o password incorrecto'// cambiar por "Email o Password Incorrecto"
            })
        }

        //confirmamos password
        const validPassword= bcrypt.compareSync(password, emailExist.password);

        if(!validPassword){
            return res.status(400).json({
                ok:false,
                msg: 'email o password incorrecto'// cambiar por "Email o Password Incorrecto"
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


export const createUserAuth = async (req:Request,res:Response): Promise<Response> => {
    
    const {email,password}:Auth= req.body;

    try {
        
        const emailExist =  await getRepository(Auth).findOne({email});
        
        if(emailExist!=undefined){

            return res.status(400).json({
                ok:false,
                msg: 'email o password incorrecto'// cambiar por "Email o Password Incorrecto"
            })
        }


        const userNew:Auth=req.body;

        const salt= bcrypt.genSaltSync();

        userNew.password= bcrypt.hashSync(password,salt);

        const newUser= getRepository(Auth).create(userNew);

        const result = await getRepository(Auth).save(newUser);

        //GENERAR JWT
        const token =  await generarJWT(result.id+"",result.email)


        return res.status(201).json({
            ok:true,
            id:result.id,
            email: result.email,
            token
        })
        }catch (error) {
            return res.status(500).json({
                ok:false,
                msg: 'Conectate al administrador'
            })
        }
}

export const revalidarToken = async (req:Request,res:Response): Promise<Response> => {

    const {userId,email} = req;
    //generando token nuevo
    const token =  await generarJWT(userId,email);
    return res.json({
        ok:true,
        token
    })
}
