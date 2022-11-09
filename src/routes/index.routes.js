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
    res.render('index', { title: 'Libreria', message1 : 'Email o cedula ya esta en uso'});
  }
  else if(req.session.flag == 2){
    req.session.destroy();
    res.render('index', { title: 'Libreria', message2 : 'Registracion hecha, por favor inicie sesion'});
  }
  else if(req.session.flag == 3){
    req.session.destroy();
    res.render('index', { title: 'Libreria', message3 : 'Incorrect Email or Password.'});
  }
  else{
    console.log('Entre primera vez')
    res.render('index', { title: 'Libreria' });
  }
});

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
    req.session.flag = 3;
    res.redirect('/');
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
              req.session.flag = 4;
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
      const permissions = {
        "Nombre" : ["Editar Perfil", "Prubea1"]
      };
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
        
    ]   
  });
    }
    else if(req.session.role == 'root'){
      const permission = {
        "Nombre" : ["Registrar Perfil", "PrubeaRoot"]
      };
      res.render('Root', {message : 'Bienvenido ' + req.session.usuario, role:'' + req.session.role });
    }
    else if(req.session.role == 'admin'){
      const permission = {
        "NOmbre" : ["Administradores", "PrubeaAdmin"]
      };
      res.render('userhome', {message : 'Bienvenido ' + req.session.usuario, role:'' + req.session.role });
    }
  }
  else{
    res.redirect('/');
  }
});

router.get('/EditarPerfil', function(req, res, next){
  if(req.session.usuario){
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

module.exports = router;
