import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan';
import userRoute from './routes/user.routes';
import authRoute from './routes/auth.routes';
import {createConnection} from 'typeorm'


const app = express();//el app es el server basicamente xd

dotenv.config();
// console.log(process.env.JWT);

createConnection();
//morgan te ayuda a ver las peticiones http que llegan al servidor
//middlewares   -- funciones que se ejecutan antes de que lleguen a nuestras rutas
app.use(cors()); // le decimos que sue cors es para que salga de una sola ruta.
app.use(morgan('dev')) // que use morgan y que tenga un formato en consola? dev
app.use(express.json());

//rutas o routs
app.use('/api/user',userRoute); 
app.use('/api/auth',authRoute); 


app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});

