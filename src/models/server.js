import  express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import session from "express-session";


import { PORT } from "../config/config.js";



export class Server {
    constructor(){
        this.app = express();
        this.port = PORT;
        this.userPath = '/api/users';

        //Conectar a la base de datos 

        //Middleware

        //Rutas de mi aplicación
    }

    // async connectDataBase(){
    // }

    middlewares(){

    }

    routes(){
        
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor escuchando en el puerto', this.port);
        })
    }

}