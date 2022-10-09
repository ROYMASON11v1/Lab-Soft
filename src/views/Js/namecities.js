function namecities(){
    var departmentdrop = document.getElementById("department");
    var departmentSelected = departmentdrop.value;
    var city = document.getElementById("city");
    var citychild = document.getElementById("citychild");
    city.removeChild(citychild);
    var select;
    var final;
    var optioncity;
    var count;
    if (departmentSelected=="Amazonas"){
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[0].ciudades.length;
      final = final-1;
      count = 0;
      for (count=0;count<=final;count++){
        optioncity = document.createElement('option');
        optioncity.innerHTML = data[0].ciudades[count];
        document.getElementById("citychild").appendChild(optioncity);
      }
    } else if (departmentSelected=="Antioquia") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[1].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[1].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Arauca") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[2].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[2].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Atlántico") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[3].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[3].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Bolívar") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[4].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[4].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Boyacá") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[5].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[5].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Caldas") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[6].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[6].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Caquetá") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[7].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[7].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Casanare") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[8].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[8].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Cauca") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[9].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[9].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Cesar") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[10].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[10].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Chocó") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[11].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[11].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Cundinamarca") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[12].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[12].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Córdoba") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[13].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[13].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Guainía") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[14].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[14].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Guaviare") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[15].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[15].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Huila") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[16].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[16].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="La Guajira") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[17].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[17].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Magdalena") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[18].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[18].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Meta") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[19].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[19].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Nariño") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[20].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[20].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Norte de Santander") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[21].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[21].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Putumayo") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[22].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[22].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Quindío") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[23].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[23].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Risaralda") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[24].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[24].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="San Andrés y Providencia") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[25].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[25].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Santander") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[26].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[26].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Sucre") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[27].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[27].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Tolima") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[28].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[28].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Valle del Cauca") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[29].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[29].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Vaupés") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[30].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[30].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    } else if (departmentSelected=="Vichada") {
      select = document.createElement('select');
      select.setAttribute("name", "city");
      select.setAttribute("class", "form-control");
      select.setAttribute("id", "citychild");
      city.appendChild(select);
      final = data[31].ciudades.length;
      final-=
      count = 0;
      for (count=0;count<final;count++){
        var option = document.createElement('option');
        option.innerHTML = data[31].ciudades[count];
        document.getElementById("citychild").appendChild(option);
      }
    }
  }