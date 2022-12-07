const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const con = require('../conn/conn');
const { request } = require('../app');


/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.flag == 1){
    req.session.destroy();
    res.render('index', { title: 'Libreria', message1 : 'Email o cedula ya esta en uso', libro: req.session.libro});
  }
  else if(req.session.flag == 2){
    req.session.destroy();
    res.render('index', { title: 'Libreria', message2 : 'Registracion hecha, por favor inicie sesion', libro: req.session.libro});
  }
  else if(req.session.flag == 3){
    req.session.destroy();
    res.render('index', { title: 'Libreria', message3 : 'Email o contraseña incorrecta.', libro: req.session.libro});
  }
  else{
    var sql = 'SELECT id_libro, titulo, autor, estado, precio, cantidad, imagenLibro FROM `Libro`;';

    con.query(sql, function(err, result, fields){
      if(err) throw err;

      if(result.length > 0){
        req.session.libro = result
        const fs = require('fs')
          for (let i = 0; i < req.session.libro.length; i++) {
          let x = i +1
          let name = "src/views/img/imagen" + req.session.libro[i]["id_libro"] + ".png"
          // fs.writeFile(name, req.session.libro[i]["imagenLibro"], {encoding: 'base64'}, function(err){
          //   if (err) console.log(err)
          //   else{
          //     console.log("creado")
          //   }
          // })
        }
        console.log("aquiiii  ", req.session.libro[0]["imagenLibro"])
        res.render('index', { title: 'Libreria', libro: req.session.libro});
      }
    })
  }
});

router.get('/reservar/:id_libro', function(req, res, next) {
  if(req.session.role == 'cliente'){
    console.log("reservado")
  }else{
    console.log("NO ERES CLIENTE")
    res.redirect('/login');
  }
})

router.get('/compra/:id_libro', function(req, res, next) {
  if(req.session.role == 'cliente'){
    console.log("reservado")
  }else{
    console.log("NO ERES CLIENTE")
    res.redirect('/login');
  }
})

//Handle POST request for User Registration FIXME:
router.post('/auth_reg', function(req, res, next){

  const cedula = req.body.Cedula;
  const nombre = req.body.Nombre;
  const fecha_nacimiento = req.body.FechaNacimiento;
  const lugar_nacimiento = req.body.LugarNacimiento;
  const genero = req.body.Genero;
  const correo = req.body.Correo;
  const usuario = req.body.Usuario;
  const temasPreferencia = "Terror tributario"; //FIXME:
  const role = 'cliente'
  const password = req.body.Contrasena;
  const cpassword = req.body.ValidacionContrasena;
  const departamento = req.body.Departamento;
  const ciudad = req.body.city;
  const direccion = `${req.body.Direccion}, ${ciudad}, ${departamento}`;

  if(cpassword == password){

    var sql = 'select * from cliente where usuario = ?;';

    con.query(sql,[correo], function(err, result, fields){
      if(err) throw err;

      if(result.length > 0){
        req.session.flag = 1;
        res.redirect('/');
      }else{

        var hashpassword = bcrypt.hashSync(password, 10);
        var sql = 'insert into cliente(cedula,nombre,fecha_nacimiento,lugar_nacimiento,direccion,genero,usuario,temasPreferencia,role,contrasena) values(?,?,?,?,?,?,?,?,?,?);';

        con.query(sql,[cedula,nombre,fecha_nacimiento,lugar_nacimiento,direccion,genero,correo,temasPreferencia,role,hashpassword], function(err, result, fields){
          if(err) throw err;
          req.session.flag = 2;
          res.redirect('/');
        });
      }
    });
  }else{
    res.redirect('/login');
  }
});


//Handle POST request for User Login
router.post('/auth_login', function(req,res,next){
  var usuario = req.body.correo;
  var password =req.body.contrasena;
  var sql = 'select * from cliente where usuario = ?';
  con.query(sql,[usuario], function(err,result, fields){
    if(err) throw err;

    if(result.length && bcrypt.compareSync(password, result[0].contrasena)){
      console.log("exist client");
      req.session.role = result[0].role;
      req.session.usuario = result[0].usuario;
      req.session.Cedula = result[0].cedula;
      console.log('root');
      res.redirect('/userhome');
    }else{
      var sql = 'select * from Root where usuario = ?';
      con.query(sql,[usuario], function(err, result, fields){
        console.log("exist root");
        if(err) throw err;
        if(result.length && bcrypt.compareSync(password, result[0].contrasena)){
          console.log("exist root");
          req.session.role = result[0].role;
          req.session.usuario = result[0].usuario;
          console.log(req.session.role, req.session.usuario);
          console.log('root');
          res.redirect('/Root');
        }else{
          var sql = 'select * from Administrador where usuario = ?';
          con.query(sql,[usuario], function(err, result, fields){
            console.log("Exist admin");
            if(err) throw err;
            if(result.length && bcrypt.compareSync(password, result[0].contrasena)){
              console.log("Exist admin");
              req.session.role = result[0].role;
              req.session.usuario = result[0].usuario;
              console.log(req.session.role, req.session.usuario);
              console.log('admin');
              res.redirect('/userhome');
             }else{
              console.log("no exist");
              res.redirect('/')  
             }
        });
      }      
      });
    }
  });
});

router.get('/Root', function(req, res, next){
  if (req.session.role != null){
    if(req.session.role == 'root' && req.session.flag == undefined){
      console.log(req.session.flag, "registrando")
      res.render('Root', {nada: "Nada que mostrar"})
    }
    else if(req.session.flag == 5){
      console.log(req.session.flag, "registrado con exito")
      res.render('Root', {registrado :"Nuevo administrador registrado con exito " });
      req.session.flag = undefined;
    }
    else if(req.session.flag == 6){
      console.log(req.session.flag, "ya registrado")
      res.render('Root', {existe :"Administrador ya registrado " });
      req.session.flag = undefined;
    }
  else{
    console.log("no existes")
    res.redirect('/');
  }
}else{
  res.redirect('/')
}
});

router.post('/auth_registarAdmin', function(req, res, next){

  const usuario = req.body.usuario;
  const nombre = req.body.nombre;
  const password = req.body.contrasena;
  const role = 'admin'
  console.log("registrando admin")
  if(req.session.role == 'root'){
    var sql = 'select * from Administrador where usuario = ?;';
    con.query(sql,[usuario], function(err, result, fields){
      console.log("registrando admin si existe")
      if(err) throw err;
      if(result.length > 0){
        req.session.flag = 6;
        console.log("YA EXISTE")
        res.redirect('/Root');
      }else{
        console.log("registrando admin si no existe", usuario);
        var hashpassword = bcrypt.hashSync(password, 10);
        var sql = 'insert into Administrador(usuario,nombre,contrasena,role) values(?,?,?,?);';

        con.query(sql,[usuario,nombre,hashpassword,role], function(err, result, fields){
          
          if(err) throw err;
          req.session.flag = 5
          res.redirect('/Root');
        });
      }
    });
  }else{
    res.redirect('/');
  }
});

router.get('/userhome', function(req, res, next){
  if (req.session.usuario)
    {if(req.session.role == 'cliente'){
      res.render('userhome', {message : 'Bienvenido ' + req.session.usuario, role:'' + req.session.role, permission: [
        {id: "Editar Perfil",
        ref: 'EditarPerfil',
        prueba: "Prubea"
      },
        {id: "Tarjetas",
        ref: "userhome",
          prueba: "Prubea2"
        },
        {id: "Historial",
        ref: "userhome",
          prueba: "Prubea2"
        },
        {id: "Reservas",
        ref: "userhome",
          prueba: "Prubea2"
        },
        {id: "Compras", 
        ref: "userhome",
          prueba: "Prubea2"
        },
        {id: "Foro",
        ref: "userhome",
          prueba: "Prubea2"
        }
        
    ], libro: req.session.libro   
  });
    }
    else if(req.session.role == 'admin'){
      res.render('userhome', {message : 'Bienvenido ' + req.session.usuario ,permission: [
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
      ]
      });
    }
  }
  else{
    res.redirect('/');
  }
});

router.get('/EditarPerfil', function(req, res, next){
  if(req.session.role == 'cliente'){
    var sql = 'select * from cliente where cedula = ?;';
    con.query(sql,[req.session.Cedula], function(err, result, fields){
      console.log(result[0].cedula, result[0].lugar_nacimiento, result[0].fecha_nacimiento, result[0].nombre)
      const fecha = result[0].fecha_nacimiento
      console.log("Editando Perfil", fecha)
    res.render('EditarPerfil', {message :"hola", role: req.session.role, Cedula: result[0].cedula, Nombre: result[0].nombre, Fecha: result[0].fecha_nacimiento, Lugar: result[0].lugar_nacimiento, Genero: result[0].genero, Correo: result[0].usuario})
    })
    
  }
})

router.post('/auth_perfil_base', function(req, res, next){
  console.log("editar perfil aqui")
  const cedula = req.body.Cedula;
  const nombre = req.body.Nombre;
  const fecha_nacimiento = req.body.FechaNacimiento;
  const lugar_nacimiento = req.body.LugarNacimiento;
  const genero = req.body.Genero;
  const correo = req.body.Correo;
  var sql = 'UPDATE cliente set cedula = ?, nombre = ?, fecha_nacimiento = ?, lugar_nacimiento = ?, genero = ?, usuario = ? where cedula = ?;';
  con.query(sql,[cedula, nombre, fecha_nacimiento, lugar_nacimiento, genero, correo, req.session.Cedula], function(err, result, fields){
    if(err) throw err;
          req.session.flag = 2;
          res.redirect('/EditarPerfil');
  })
})

router.post('/auth_envio_base', function(req, res, next){
  console.log("envio aqui")
  const pais = req.body.Pais
  const departamento = req.body.Departamento;
  const ciudad = req.body.city;

  const {uno, dos, tres, cuatro} = req.body;
  const newedit = {
    uno, dos, tres, cuatro
  }
  console.log(newedit)
  //console.log(pais, departamento, ciudad)
  const direccion = `${req.body.Direccion}, ${pais}, ${departamento}, ${ciudad}`;
  var sql = 'UPDATE cliente set direccion = ? where cedula = ?;';
  con.query(sql,[direccion, req.session.Cedula], function(err, result, fields){
    if(err) throw err;
          req.session.flag = 2;
          res.redirect('/EditarPerfil');
  })  
})

router.post('/auth_contrasena_base', function(req, res, next){
  console.log("aquiiii")
  const lastpassword = req.body.Contrasena
  const password = req.body.Contrasena1;
  var hashpassword = bcrypt.hashSync(password, 10);
  var sql = 'UPDATE cliente set contrasena = ? where cedula = ?;';
  con.query(sql,[hashpassword, req.session.Cedula], function(err, result, fields){
    if(err) throw err;
          req.session.flag = 2;
          res.redirect('/EditarPerfil');
  })
})

router.get("/adminLibros", function (req, res, next) {
  console.log(req.session.usuario, req.session.role)
      if (req.session.usuario) {
        if (req.session.role == "admin") {
            var sql = "SELECT id_libro, titulo, autor, estado, precio, cantidad, imagenLibro FROM `Libro`;";
            con.query(sql, function (err, result, fields) {
              req.session.libro = result
              console.log(req.session.libro[0]["titulo"])
              res.render("adminLibros", {
                message: "Bienvenido",
                libro: req.session.libro,
                role: req.session.role
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
  console.log("AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")
  
  const imagen = req.body.imagen;
  console.log(imagen)
  const titulo = req.body.titulo;
  const autor = req.body.autor;
  const descripcion = req.body.descripcion;
  const cantidad = req.body.cantidad;
  const genero = "terror";
  console.log(titulo, autor, cantidad, genero)
  const numero_paginas = req.body.numero_paginas;;
  const editorial = req.body.editorial; //FIXME:
  const issn = req.body.issn; 
  const idioma = req.body.idioma;
  const fecha_publicacion = req.body.fechapublicacion;
  const estado = "Nuevo"
  console.log(numero_paginas,editorial, issn, idioma, fecha_publicacion, " + ", estado)
  const precio = req.body.precio;
  console.log(precio)
  const ano_publicado = "2004"

  console.log(titulo)
    const sql = 'select id_libro from Libro where ISSN=?;';

    con.query(sql, [issn], function(err, result, fields){
        if(err) throw err;

        if(result.lenght > 0){
            //ENVIAR UN MENSAJE QUE DIGA QUE ESTE LIBRO A ESTA AGREGADO
            console.log("YA EXISTE")
            res.redirect('/adminAgregarLibro');
        }else{
            //FALTA AGREGAR BIEN EL NOMBRE DE LA IMAGEN; NO SE QUE NOMBRE TIENE EN LA BD
            //VERIFICAR COMO AGREGARLA :D
            const sql = 'insert into Libro(titulo, autor, Resumen, ano_publicado, numero_paginas, editorial, ISSN, idioma, fecha_publicacion, estado, precio, genero, Cantidad) values(?,?,?,?,?,?,?,?,?,?,?,?,?);';
            //Hay alguna forma que este sql me retorne el id de este libro creado?
            con.query(sql, [titulo, autor, descripcion, ano_publicado, numero_paginas, editorial, issn, idioma,fecha_publicacion,estado, precio, genero,  cantidad], function(err, result, fields){
                if(err) throw err;
                //Agregar la cantidad y el id del libro a la tabla inventari
                res.redirect("/adminLibros")
            });
        }
    })

    


});

router.get("/adminEditarLibro/:id_libro", function (req, res, next) {
  const libro = req.params.id_libro;
  console.log("editando", req.params.id_libro)
  req.session.Libroid = req.params.id_libro;
  console.log(req.session.libroid)
  //Verificar que sea admin
  res.render('adminEditarLibro', { title: 'Libreria', id : req.params.id_libro});
});

router.post("/auth_adminEditarLibro/:id_libro", function (req, res, next) {
console.log("AQUIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII")

const imagen = req.body.imagen;
console.log(imagen)
const titulo = req.body.titulo;
const autor = req.body.autor;
const descripcion = req.body.descripcion;
const cantidad = req.body.cantidad;
const genero = "terror";
console.log(titulo, autor, cantidad, genero)
const numero_paginas = req.body.numero_paginas;;
const editorial = req.body.editorial; //FIXME:
const issn = req.body.issn; 
const idioma = req.body.idioma;
const fecha_publicacion = req.body.fechapublicacion;
const estado = "Nuevo"
console.log(numero_paginas,editorial, issn, idioma, fecha_publicacion, " + ", estado)
const precio = req.body.precio;
console.log(precio)
const ano_publicado = "2004"

console.log(titulo)
    const sql = 'UPDATE Libro SET titulo = ?, autor = ?, precio = ?, Cantidad = ? WHERE id_libro = ?;';
    //Hay alguna forma que este sql me retorne el id de este libro creado?
    con.query(sql, [titulo, autor, precio, cantidad, req.params.id_libro], function(err, result, fields){
        if(err) throw err;
        //Agregar la cantidad y el id del libro a la tabla inventari
        res.redirect("/adminLibros")
    });
});

router.get("/delete/:id_libro", function(req, res, next){
    const id = req.params.id_libro;
    console.log(id, " Borrando")
    const sql = 'delete from Libro where id_libro = ?';
    con.query(sql, [id], function(err, result, fields){
        if(err) throw err;
        //Enviar un mensaje de libro eliminado
        res.redirect('/adminLibros');
    });

});

//Rutas para 4 iteracion
router.get("/adminExistencias", function (req, res, next) {});
router.get("/adminTienda", function (req, res, next) {});
router.get("/adminAgotados", function (req, res, next) {});
router.get("", function (req, res, next) {});

router.get('/logout', function(req, res, next){
  if(req.session.usuario){
    req.session.destroy();
    res.redirect('/');
  }
})

router.get('/login', function(req, res, next){
  res.render('login', { title: 'Libreria' });
})

router.get('/register', function(req, res, next){
  res.render('register', { title: 'Libreria' });
})

router.get("/tarjetas", function (req, res, next) {
  if (req.session.usuario) {
      if (req.session.role == "cliente") {
          const sql = "select numero_tarjeta, fecha_vencimiento from Tarjeta where cedula = ?;";
          con.query(sql, function (err, result, fields) {
                  result.forEach(libro => {
                      console.log(libro);
                  });
                  res.render("EditarPerfil", {
                      message: "Bienvenido",
                      role: req.session.role,
                      //Lista libros
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

router.get("agregarTarjeta", function(){
  res.render('agregarTarjeta', { title: 'Libreria' });
});

router.post("/auth_crear_tarjeta/:cedula", function(req, res, next){
  const FechaVencimiento = req.body.FechaVencimiento;
  const Tarjeta = req.body.Tarjeta;
  const CVV = req.body.CVV;
  
  // const {FechaVencimiento, CVV, Tarjeta} = req.body;
  const cedula = req.params.cedula;

  const sql = 'insert into Tarjeta(numero_tarjeta, ccv, fecha_vencimiento, saldo, cedula) values(?,?,?,?,?);';

  con.query(sql, [Tarjeta, CVV, FechaVencimiento, 0, cedula], function(req, res, next){
      if(err) throw err;
      redirect('/tarjetas');
  });
});

router.put("/agregar_tarjeta/:id", function(req, res, next){
  const id = req.params.id;
  const saldo = req.body.saldo;
  if(saldo >= 0){
      const sql = 'UPDATE Tarjeta SET saldo += IFNULL(?, saldo) WHERE  numero_tarjeta=?;';
      con.query(sql, [saldo, id], function(req, res, next){
          if(err) throw err;
          redirect('/tarjetas');
      });
  }
});

router.delete("/tarjeta/:id", function(req, res, next){
  const id = req.params.id;
  const sql = 'delete from Tarjeta where numero_tarjeta = ?;';
  con.query(sql, [id], function(err, result, fields){
      if(err) throw err;
      //Enviar un mensaje de libro eliminado
      redirect('/tarjetas');
  });
});

module.exports = router;
