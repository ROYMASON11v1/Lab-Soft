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

//Handle POST request for User Registration
router.post('/auth_reg', function(req, res, next){

  const cedula = req.body.cedula;
  const nombre = req.body.nombre;
  const fecha_nacimiento = req.body.fecha_nacimiento;
  const lugar_nacimiento = req.body.lugar_nacimiento;
  const direccion = req.body.direccion;
  const genero = req.body.genero;
  const correo = req.body.correo;
  const temasPreferencia = req.body.temasPreferencia;
  const role = 'cliente'
  const password = req.body.contrasena;
  const cpassword = req.body.ccontrasena;

  if(cpassword == password){

    var sql = 'select * from cliente where correo = ?;';

    con.query(sql,[correo], function(err, result, fields){
      if(err) throw err;

      if(result.length > 0){
        req.session.flag = 1;
        res.redirect('/');
      }else{

        var hashpassword = bcrypt.hashSync(password, 10);
        var sql = 'insert into cliente(cedula,nombre,fecha_nacimiento,lugar_nacimiento,direccion,genero,correo,temasPreferencia,role,contrasena) values(?,?,?,?,?,?,?,?,?,?);';

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

  var correo1 = req.body.correo;
  var password =req.body.contrasena;
  var sql = 'select * from cliente where correo = ?;';
  con.query(sql,[correo1], function(err,result, fields){
    if(err) throw err;

    if(result.length && bcrypt.compareSync(password, result[0].contrasena)){
      req.session.role = result[0].role;
      req.session.usuario = result[0].nombre;
      res.redirect('/libreria');
    }else{
      req.session.flag = 4;
      res.redirect('/');
    }
  });
});

router.post('/auth_rootlogin', function(req,res,next){

  var usuario = req.body.usuario;
  var password =req.body.contrasena;
  console.log(usuario);
  console.log(password);
  var sql = 'select * from Root where usuario = ?;';
  con.query(sql,[usuario], function(err,result, fields){
    if(err) throw err;

    if(result.length && bcrypt.compareSync(password, result[0].contrasena)){
      req.session.role = result[0].role;
      req.session.usuario = result[0].usuario;
      res.redirect('/libreria');
    }else{
      req.session.flag = 4;
      res.redirect('/');
    }
  });
});


//Route For Home Page
router.get('/libreria', function(req, res, next){
  if(req.session.role == 'cliente'){
    var permissions = 1
  }else if(req.session.role == 'admin'){
    var permissions = 2

  }else if(req.session.role == 'root'){
    //const role_data = [{role: req.session.role}]
    //const node = document.createElement("p")
    //const prueba = document.createTextNode("water")
    //node.appendChild(prueba);
    //document.getElementById("pruebaPadre").appendChild(node)
  }else{
    var permissions = 4;
  }
  // res.send(`hola amiguitos ${req.session.role}`)
  // res.render('libreria', () => ({}))
  res.render('libreria', {message : 'Bienvenido ' + req.session.usuario + ", " + req.session.role, role:'' + req.session.role });
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
