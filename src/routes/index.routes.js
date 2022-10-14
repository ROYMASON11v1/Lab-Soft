const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const con = require('../conn/conn');

/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.flag == 1){
    req.session.destroy();
    res.render('index', { title: 'Libreria', message : 'Email Already Exists' , flag : 1});
  }
  else if(req.session.flag == 2){
    req.session.destroy();
    res.render('index', { title: 'Libreria', message : 'Registration Done. Please Login.', flag : 0});
  }
  else if(req.session.flag == 3){
    req.session.destroy();
    res.render('index', { title: 'Libreria', message : 'Confirm Password Does Not Match.', flag : 1});
  }
  else if(req.session.flag == 4){
    req.session.destroy();
    res.render('index', { title: 'Libreria', message : 'Incorrect Email or Password.', flag : 1 });
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
  const ciudad = req.body.Ciudad;
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
          res.redirect('/userhome');
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

router.get('/userhome', function(req, res, next){
  if (req.session.usuario)
    {if(req.session.role == 'cliente'){
      const permissions = {
        "Nombre" : ["Editar Perfil", "Prubea1"]
      };
      res.render('userhome', {message : 'Bienvenido ' + req.session.usuario, role:'' + req.session.role, permission: [
        {id: "Editar Perfil",
        prueba: "Prubea"
      },
        {id: "Tarjetas",
          prueba: "Prubea2"
        },
        {id: "Historial",
          prueba: "Prubea2"
        },
        {id: "Reservas",
          prueba: "Prubea2"
        },
        {id: "Compras",
          prueba: "Prubea2"
        },
        {id: "Foro",
          prueba: "Prubea2"
        }
        
    ]   
  });
    }
    else if(req.session.role == 'root'){
      const permission = {
        "Nombre" : ["Registrar Perfil", "PrubeaRoot"]
      };
      res.render('userhome', {message : 'Bienvenido ' + req.session.usuario, role:'' + req.session.role });
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
