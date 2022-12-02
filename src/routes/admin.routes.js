const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const con = require("../conn/conn");

router.get("/adminLibros", function (req, res, next) {
    if (req.session.usuario) {
        if (req.session.role == "admin") {
            var sql = "select * from Libro";
            con.query(sql, function (err, result, fields) {
                    result.forEach(libro => {
                        console.log(libro);
                    });
                    res.render("EditarPerfil", {
                        message: "Bienvenido",
                        role: req.session.role, 
                        permission: [
                            {id: "Libros",
                            ref: 'adminLibros',
                            prueba: "Prubea"
                          },
                            {id: "Existencias",
                            ref: "adminExistencias",
                              prueba: "Prubea2"
                            },
                            {id: "Agotados",
                            ref: "adminAgotados",
                              prueba: "Prubea2"
                            },
                            {id: "Ventas",
                            ref: "userhome",
                              prueba: "Prubea2"
                            },
                            {id: "Tiendas",
                            ref: "adminTienda",
                              prueba: "Prubea2"
                            }
                          ], libro : req.session.libro
                    });
                }
            );
        } else {
            res.redirect("/");
        }
    } else {
        res.redirect("/");
    }
});

router.get("/adminAgregarLibro", function (req, res, next) {
    //Verificar que sea admin
    res.render('adminAgregarLibro', { title: 'Libreria' });
});

router.post("/auth_adminAgregarLibro", function (req, res, next) {

    const {imagen, titulo, autor, descripcion, pags, genero, cant, 
        editorial, issn, idioma, f_publi, estado, precio} = req.body;
    
    const sql = 'select id_libro from Libro where ISSN=?;';

    con.query(sql, [issn], function(err, result, fields){
        if(err) throw err;

        if(result.lenght > 0){
            //ENVIAR UN MENSAJE QUE DIGA QUE ESTE LIBRO A ESTA AGREGADO
            res.redirect('/adminAgregarLibro');
        }else{
            //FALTA AGREGAR BIEN EL NOMBRE DE LA IMAGEN; NO SE QUE NOMBRE TIENE EN LA BD
            //VERIFICAR COMO AGREGARLA :D
            const sql = 'insert into Libro(imagen, titulo, autor, Resumen, ano_publicado, genero, numero_paginas, editorial, ISSN, idioma, fecha_publicacion, estado, precio) values(?,?,?,?,?,?,?,?,?,?,?,?,?);';
            //Hay alguna forma que este sql me retorne el id de este libro creado?
            con.query(sql, [imagen, titulo, autor, descripcion, f_publi, genero, pags, editorial, issn, idioma, estado, precio], function(err, result, fields){
                if(err) throw err;
                //Agregar la cantidad y el id del libro a la tabla inventario
                const sql_inv = 'select id_libro from Libro where ISSN = ?;';

                con.query(sql_inv, [issn], function(err, result, fields){
                    if(err) throw err;
                    const id_libro = result[0].id_libro;
                    const sql_inv = 'insert into inventarioTienda(id_libro, cantidad) values(?, ?)';
                    con.query(sql_inv, [id_libro, cant], function(err, result, fields){
                    if(err) throw err;
                    res.redirect('/adminLibros');
                    })
                });
            });
        }
    })

    


});

router.delete("/:id", function(req, res, next){
    const {id} = req.params;
    const sql = 'delete from Libro where id_libro = ?';
    con.query(sql, [id], function(err, result, fields){
        if(err) throw err;
        //Enviar un mensaje de libro eliminado
        redirect('/adminLibros');
    });

});

//Rutas para 4 iteracion
router.get("/adminExistencias", function (req, res, next) {
    res.render("adminExistencias", {
        message: "Bienvenido",
        role: req.session.role,
        //Lista libros
    })
});
router.get("/adminTienda", function (req, res, next) {
    res.render("adminTienda", {
        message: "Bienvenido",
        role: req.session.role,
        //Lista libros
    })
});
router.get("/adminAgotados", function (req, res, next) {
    res.render("adminAgotados", {
        message: "Bienvenido",
        role: req.session.role,
        //Lista libros
    })
});
router.get("", function (req, res, next) {});

module.exports = router;