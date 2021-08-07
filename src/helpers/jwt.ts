import jwt from 'jsonwebtoken';

export const generarJWT = (id:string,email:string)=>{
    return new Promise( (resolve, reject)=>{
        const payload= {id,email};
        jwt.sign(payload,process.env.TOKER_SECRET||'tokentest',{
            expiresIn:'2h'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        }
        );
    });
}
