$(function(){
    var validacion2 = $("#form-tarjeta").validate({
        rules:{
            Nombre:{
                required: true,
                minlength: 5
            },
            Tarjeta:{
                required: true,
                creditcard: true
            },
            FechaVencimiento:{
                required: true
            },
            CVV:{
                required:true,
                minlength: 3
            }
        },
        messages:{
            Nombre:{
                required: "Escriba un nombre",
                minlength: "El nombre debe ser de al menos 5 caracteres"
            },
            Tarjeta:{
                required: "Ingrese un numero de tarjeta",
                creditcard: "Ingrese un numero de tarjeta valido"
            },
            FechaVencimiento:{
                required: "Ingese una fecha de vencimiento"
            },
            CVV:{
                required: "Ingrese el CVV",
                minlength: "El CVV debe ser de tres dígitos"
            }
        }
    });
    validacion2.validate();
});
