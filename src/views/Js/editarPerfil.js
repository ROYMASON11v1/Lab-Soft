$(function(){
    $("#pais" ).change(function() {
        if ($(this).val() == "Colombia"){
            $(".dep-ciu").show();
        }else{
            $(".dep-ciu").hide();
        }
      });
    $("#EditarPerfil").click(function () {
        $('.perfil').css('background', 'whitesmoke');
        $('.envio').css('background', 'white');
        $('.contrasena').css('background', 'white');
        $(".datosEnvio").hide();
        $(".datosContrasena").hide();
        $(".formulario").show();
    });
    $("#EditarEnvio").click(function () {
        $('.perfil').css('background', 'white');
        $('.envio').css('background', 'whitesmoke');
        $('.contrasena').css('background', 'white');
        $(".formulario").hide();
        $(".datosContrasena").hide();
        $(".datosEnvio").show();
    });
    $("#EditarContrasena").click(function () {
        $('.perfil').css('background', 'white');
        $('.envio').css('background', 'white');
        $('.contrasena').css('background', 'whitesmoke');
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
$(function(){
    var validacion2 = $("#validardireccion").validate({
        rules:{
            Departamento:{
                required: true
            },
            Pais:{
                required:true
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
            Pais:{
                required: "Seleccione un pais"
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
    validacion2.validate();
});
$(function(){
    jQuery.validator.addMethod("noSpace", function(value, element) { 
        return value == '' || value.trim().length != 0;  
      }, "No se aceptan espacios en blanco");
    var validacion3 = $("#validarcontrasena").validate({
        rules:{
            Contrasena:{
                required:true,
                minlength:8,
                noSpace: true
            },
            Contrasena1:{
                required:true,
                minlength:8,
                noSpace: true
            },
            ValidacionContrasena:{
                required:true,
                equalTo:contrasena1,
                minlength: 8
            }
        },
        messages:{
            Contrasena:{
                required:"Ingrese una contraseña",
                minlength: "La contraseña debe tener al menos 8 caracteres"
            },
            Contrasena1:{
                required:"Ingrese una contraseña",
                minlength: "La contraseña debe tener al menos 8 caracteres"
            },
            ValidacionContrasena:{
                required: "Ingrese la validación de la contrasena",
                equalTo: "Ingrese la misma contraseña",
                minlength: "La contraseña debe tener al menos 8 caracteres"
            }
        }
    });
    validacion3.validate();
})


