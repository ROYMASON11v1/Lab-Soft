import  express from "express";
//import cors from "cors"; --> puede ser util

import { PORT } from "../config/config.js";
import { indexRoutes } from "../routes/index.routes"; //TODO
import { usersRoutes } from "../routes/users.routes"; //TODO
import { rootRoutes } from "../routes/root.routes.js"; //TODO


export class Server {
    constructor(){
        this.app = express();
        this.port = PORT;
        this.userPath = '/users';
        this.rootPath = '/root';
        this.adminPath = '/admin';

        //Conectar a la base de datos 

        //Middleware

        //Rutas de mi aplicación
    }

    // async connectDataBase(){
    // }

    middlewares(){
        
        //cors
        // this.app.use( cors() );

        //View engine setup
        app.set( "views", __dirname + '/views' );
        app.set( "view engine", "pug" );

        app.use( express.json( ) );
        // app.use( express.urlencoded( { extended: false } ) );
        app.use( express.static( "public" ) );
    }

    routes(){
        app.use("/", indexRoutes);
        app.use(this.userPath, usersRoutes);
        app.use(this.rootPath, rootRoutes);
        
        this.app.use( (req, res, next) => {
            res.status(404).json( {
                message: 'Endpoint not found'
            } )
        });
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor escuchando en el puerto', this.port);
        })
    }

}