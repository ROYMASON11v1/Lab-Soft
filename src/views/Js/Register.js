$(function(){
    var validacion = $("#formRegister").validate({
        rules:{
            Cedula:{
                required: true,
                minlength: 5,
                digits: true
            },
            Nombre:{
                required:true,
                minlength:6
            },
            FechaNacimiento:{
                required: true,
                date: true
            },
            LugarNacimiento:{
                required: true,
                minlength: 4
            },
            Genero:{
                required:true
            },
            Correo:{
                required: true,
                email: true
            },
            Usuario:{
                required: true,
                minlength: 4
            },
            Contrasena:{
                required:true,
                minlength:8
            },
            ValidacionContrasena:{
                required:true,
                equalTo:contrasena,
                minlength: 8
            },
            Departamento:{
                required: true
            },
            Ciudad:{
                required:true
            },
            Direccion:{
                required:true,
                minlength: 8
            }
        },
        messages:{
            Cedula:{
                required: "Ingrese un numero de cédula",
                minlength: "El numero debe ser de al menos 5 caracteres",
                digits: "Solo ingrese numeros"
            },
            Nombre:{
                required:"Ingrese su nombre completo",
                minlength:"El nombre debe tener al menos 6 caracteres"
            },
            FechaNacimiento:{
                required:"Ingrese su fecha de nacimiento",
                date: "Ingrese una fecha"
            },
            LugarNacimiento:{
                required: "Ingrese lugar de nacimiento",
                minlength: "El lugar debe tener al menos 4 caracteres"
            },
            Genero:{
                required: "Seleccione un genero"
            },
            Correo:{
                required: "Ingrese un correo",
                email: "Ingrese una dirección de correo valido"
            },
            Usuario:{
                required:"Ingrese un usuario",
                minlength: "El usuario debe tener al menos 4 caracteres"
            },
            Contrasena:{
                required:"Ingrese una contraseña",
                minlength: "La contraseña debe tener al menos 8 caracteres"
            },
            ValidacionContrasena:{
                required: "Ingrese la validación de la contrasena",
                equalTo: "Ingrese la misma contraseña",
                minlength: "La contraseña debe tener al menos 8 caracteres"
            },
            Departamento:{
                required: "Seleccione un departamento"
            },
            Ciudad:{
                required:"Seleccione una ciudad"
            },
            Direccion:{
                required:"Ingrese una direccion",
                minlength: "La dirección debe tener al menos 8 caracteres"
            }
        }
    });
    $("#Paso1").click(function () {
        if (validacion.element("#cedula") && validacion.element( "#nombre") && validacion.element( "#fechaNacimiento") && validacion.element( "#lugarNacimiento") && validacion.element("#genero")  && validacion.element("#correo") && validacion.element("#usuario" ) && validacion.element("#contrasena") && validacion.element("#validacionContrasena")){
            $(".DatosPersonales").hide();
            $(".DatosEnvio").show();
        }
    });
    $("#Paso2").click(function () { 
        if ( validacion.element("#department") && validacion.element("#direccion") ){
            $(".DatosEnvio").hide();
            $(".TemasFavoritos").show();
        }
    });
    $("#Paso2Atras").click(function (e) { 
        $(".DatosEnvio").hide();
        $(".DatosPersonales").show();
    });
    $("#Paso3Atras").click(function (e) { 
        $(".TemasFavoritos").hide();
        $(".DatosEnvio").show();
    });
    
});
