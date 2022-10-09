$(function(){
    $("#EditarPerfil").click(function () {
        $(".datosEnvio").hide();
        $(".datosContrasena").hide();
        $(".formulario").show();
    });
    $("#EditarEnvio").click(function () {
        $(".formulario").hide();
        $(".datosContrasena").hide();
        $(".datosEnvio").show();
    });
    $("#EditarContrasena").click(function () {
        $(".formulario").hide();
        $(".datosEnvio").hide();
        $(".datosContrasena").show();
    });
    var validacion = $("#editarperfil").validate({
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
            }
        }
    });
    validacion.validate();
    
});
