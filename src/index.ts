import 'reflect-metadata';
import express from 'express';
import cors from 'cors'
import morgan from 'morgan';
import useRoute from './routes/user.routes';
import {createConnection} from 'typeorm'
require('dotenv').config();

const app = express();//el app es el server basicamente xd
createConnection();
//morgan te ayuda a ver las peticiones http que llegan al servidor

//middlewares   -- funciones que se ejecutan antes de que lleguen a nuestras rutas
app.use(cors()); // le decimos que sue cors
app.use(morgan('dev')) // que use morgan y que tenga un formato en consola? dev
app.use(express.json());

//rutas o routs
app.use(useRoute); 


app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});

