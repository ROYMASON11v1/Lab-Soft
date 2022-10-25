$(function(){
    jQuery.validator.addMethod("noSpace", function(value, element) { 
        return value == '' || value.trim().length != 0;  
      }, "No se aceptan espacios en blanco");
      jQuery.validator.addMethod(
        "validDOB",
        function(value, element) {              
            //var from = value.split(" "); // DD MM YYYY
            var from = value.split("-"); // DD/MM/YYYY
            var day = from[2];
            var month = from[1];
            var year = from[0];
            var age = 18;
            var mydate = new Date();
            mydate.setFullYear(year, month-1, day);

            var currdate = new Date();
            var setDate = new Date();

            setDate.setFullYear(mydate.getFullYear() + age, month-1, day);

            if ((currdate - setDate) > 0){
                return true;
            }else{
                return false;
            }
        },
        "Debes tener mas de 18 años"
    );
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
                validDOB:true,
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
                minlength:8,
                noSpace: true
            },
            ValidacionContrasena:{
                required:true,
                equalTo:contrasena,
                minlength: 8
            },
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
    $("#Paso1").click(function () {
        if (validacion.element("#cedula") && validacion.element( "#nombre") && validacion.element( "#fechaNacimiento") && validacion.element( "#lugarNacimiento") && validacion.element("#genero")  && validacion.element("#correo") && validacion.element("#usuario" ) && validacion.element("#contrasena") && validacion.element("#validacionContrasena")){
            $(".DatosPersonales").hide();
            $(".DatosEnvio").show();
        }
    });
    $( "#pais" ).change(function() {
        if ($(this).val() == "Colombia"){
            $(".dep-ciu").show();
        }else{
            $(".dep-ciu").hide();
        }
      });
    $("#Paso2").click(function () { 
        if (validacion.element("#pais") && validacion.element("#department") && validacion.element("#direccion") ){
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
