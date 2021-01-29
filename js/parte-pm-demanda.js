// Esta es la forma en que se crean los partes, se almacenan las cosas en un objeto y despues se transforma a html y a texto
/** Acción del botón de Crear Parte
 */
function crearParte() {
  let parte = new ParteGeneral(); //Esto se sustituye por el objeto que hay en el fichero objetos.js (PuestoMandoCierre)

  parte.fecha = formatoFecha($("#date").val()); //Fecha

  parte.municipio = municipio.val(); //Municipio

  //Esto son los activos, bajas etc etc del saf, que no te hace falta como ves ahi se selecciona del html con "$" que es el selector, y del "#" es para seleccionar IDs
  parte.activos = parseInt($("#m-activos").val()) || 0;
  parte.bajas = parseInt($("#m-bajas").val()) || 0;
  parte.coordinacion = parseInt($("#m-coordinacion").val()) || 0;

  acumulado = {
    e: 0, // acumulando estudiates
    t: 0, // acumulando trabajadores
    nc: 0, // acumulando no cujae
    b: 0, // acumulando beneficiados
    c: 0, // acumulando casas
    a: 0, // acumulando ausentes
  };

  let cps = document.querySelectorAll(".cp-data");

  for (let i = 0; i < cps.length; i++) {
    //Datos de los Consejos Populares
    let nuevo_cp = new ParteConsejoPopular();

    let cp = cps[i].querySelector(".consejo-popular").value;
    let cpE = cps[i].querySelector(".voluntario-e").value;
    let cpT = cps[i].querySelector(".voluntario-t").value;
    let cpNC = cps[i].querySelector(".voluntario-nc").value;
    let cpC = cps[i].querySelector(".casa").value;
    let cpB = cps[i].querySelector(".beneficiado").value;
    let cpA = cps[i].querySelector(".ausente").value;
    nuevo_cp.comentario = cps[i].querySelector(".comentario").value;

    nuevo_cp.nombre = cp; //Nombre Consejo popular

    acumulado.e += parseInt(cpE) || 0;
    nuevo_cp.estudiantes = parseInt(cpE) || 0;

    acumulado.t += parseInt(cpT) || 0;
    nuevo_cp.trabajadores = parseInt(cpT) || 0;

    acumulado.nc += parseInt(cpNC) || 0;
    nuevo_cp.no_cujae = parseInt(cpNC) || 0;

    acumulado.c += parseInt(cpC) || 0;
    nuevo_cp.casas = parseInt(cpC) || 0;

    acumulado.b += parseInt(cpB) || 0;
    nuevo_cp.beneficiados = parseInt(cpB) || 0;

    acumulado.a += parseInt(cpA) || 0;
    nuevo_cp.ausentes = parseInt(cpA) || 0;

    parte.consejosPopulares.push(nuevo_cp);
  }

  parte.total_ausentes = acumulado.a; //total de Ausentes
  parte.total_voluntarios = acumulado.e + acumulado.t + acumulado.nc; //total de voluntarios (Estudaintes+Trabajadores+NoCujae)
  parte.total_casas = acumulado.c; //total de Casas
  parte.total_beneficiados = acumulado.b; //total de Beneficiados

  let nuevos_activos = $(".na");
  //console.log(nuevos_activos);
  for (let i = 0; i < nuevos_activos.length; i++) {
    parte.nuevos_activos.push(nuevos_activos[i].value);
  }

  let reportes_baja = $(".rb");

  for (let i = 0; i < reportes_baja.length; i++) {
    parte.reportes_baja.push(reportes_baja[i].value);
  }

  parte.comentario = $("#comentario").val();
  let area = $("#vista-previa").addClass("card");
  //Comprobar si el numero de activos es mayor que el total de voluntarios
  if (parte.activos >= parte.total_voluntarios) {
    //formato para Web y Whatsapp
    let html = parteHTML(parte);
    let texto = parteTexto(parte);

    //Añadiendo clase para css de la vista previa y incrustando el parte en el formato HTML

    area.html(html);

    //Visualizacion del parte en formato texto para enviar a whatsapp y su botón
    area.append(`<textarea  class="form-control">${texto}</textarea>`);
    area.append(
      `<a class="btn btn-info" href="https://telegram.me/share/url?url=cierre&text=${encodeURIComponent(
        texto
      )}" target="_blank" action="share/telergam/share" >
      Enviar por Telegram
      </a>`
    );

    window.localStorage.setItem("parte", JSON.stringify(parte));
    //console.log(parte);
    //console.log(parteHtml);
    //console.log(parteTexto);
  } else {
    // console.log("alertaaaa\n");
    $("body").append(`
        <div class="alert alert-warning alert-dismissible fade-in fade show" role="alert" id="alerta">
          <strong>¡Total de Voluntarios del parte.fecha excede los Voluntarios activos!</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close" id="close-alerta">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>`);
    area.html("").removeClass("card");
  }
}
/** Genera el parte en formato HTML
 * @param json formato de datos
 * @returns {string} listo para añadir al elemento contenedor
 */
function parteHTML(json) {
  let v = json.activos + json.coordinacion;

  let html = `
    <h4 class="font-weight-bold">${json.nombre}</h4>
    <h5>Día: ${json.fecha}</h5>
    <h5>Voluntarios: ${v}</h5>
    <h6><i class="fa fa-chevron-right"></i>  Activos: ${json.activos}</h6>
    <h6><i class="fa fa-chevron-right"></i>  Coordinación: ${json.coordinacion}</h6>
    <h6>Bajas: ${json.bajas}</h6>
    `;

  for (let i = 0; i < json.consejosPopulares.length; i++) {
    let v_cp =
      json.consejosPopulares[i].estudiantes +
      json.consejosPopulares[i].trabajadores +
      json.consejosPopulares[i].no_cujae;
    html += `
        <div class="v-cp card">
            <h6 class="font-weight-bold">Consejo Popular: ${json.consejosPopulares[i].nombre}</h6>
            <p>Voluntarios: ${v_cp}
                <br>
                <i class="fa fa-chevron-right"></i> Estudiantes: ${json.consejosPopulares[i].estudiantes}
                <br>
                <i class="fa fa-chevron-right"></i> Trabajadores: ${json.consejosPopulares[i].trabajadores}
                <br>
                <i class="fa fa-chevron-right"></i> No Cujae: ${json.consejosPopulares[i].no_cujae}
                <br>
                <i>Ausentes: ${json.consejosPopulares[i].ausentes}</i>
            </p>
            <p>Casas: ${json.consejosPopulares[i].casas}
                <br>
                Beneficiados: ${json.consejosPopulares[i].beneficiados} 
            </p>
            <div class="v-comentario">
                <p>${json.consejosPopulares[i].comentario}</p>
            </div>
        </div>`;
  }

  html += `<h5 class="font-weight-bold"> 
        <u>Totales <span class="font-italic font-weight-light">${json.fecha}</span></u> </h5>
    <h6><i class="fa fa-chevron-right"></i>  Voluntarios: ${json.total_voluntarios}</h6>
    <h6><i class="fa fa-chevron-right"></i>  Ausentes: ${json.total_ausentes}</h6>
    <h6><i class="fa fa-chevron-right"></i>  Casas: ${json.total_casas}</h6>
    <h6><i class="fa fa-chevron-right"></i>  Beneficiados: ${json.total_beneficiados}</h6>
    `;

  let cant_na = json.nuevos_activos.length;
  if (cant_na) {
    html += `<div><h6 class="font-weight-bold">Nuevos Activos: ${cant_na} </h6>`;
    for (let i = 0; i < cant_na; i++) {
      html += `<h6>  <i class="fa fa-chevron-right"></i> ${json.nuevos_activos[i]}</h6>`;
    }
    html += "</div>";
  }

  let cant_rb = json.reportes_baja.length;
  if (cant_rb) {
    html += `<div><h6 class="font-weight-bold">Reportes de Bajas: ${cant_rb}</h6>`;
    for (let i = 0; i < cant_rb; i++) {
      html += `<h6>  <i class="fa fa-chevron-right"></i> ${json.reportes_baja[i]}</h6>`;
    }
    html += "</div>";
  }

  html += `<div class="v-comentario"><p>${json.comentario}</p></div>`;
  return html;
}

/** genera el parte en formato texto para ser enviado a Whatsapp
 * @param json formato de datos
 * @returns {string} Listo para enviar a mensaje de Whatsapp
 */
function parteTexto(json) {
  let v = json.activos + json.coordinacion;
  let texto = `*${json.nombre}*\n
    🏘 Consejos Populares Activos: #{json.consejosPopulares.length} \n
    Día: ${json.fecha} \n\n
    Voluntarios: *${v}* \n
      💚 Activos: ${json.activos} \n
      ◽ Coordinación: ${json.coordinacion} \n
    🔸 Bajas: ${json.bajas} \n\n
    `;

  for (let i = 0; i < json.consejosPopulares.length; i++) {
    let v_cp =
      json.consejosPopulares[i].estudiantes +
      json.consejosPopulares[i].trabajadores +
      json.consejosPopulares[i].no_cujae;
    texto += `🏘 *Consejo Popular: ${json.consejosPopulares[i].nombre} *\n
            Voluntarios Hoy: ${v_cp} \n
            • Estudiantes: ${json.consejosPopulares[i].estudiantes} \n
            • Trabajadores: ${json.consejosPopulares[i].trabajadores} \n
            • No Cujae: ${json.consejosPopulares[i].no_cujae}\n
            _Ausentes: ${json.consejosPopulares[i].ausentes} _\n
            Casas: ${json.consejosPopulares[i].casas} \n
            Beneficiados: ${json.consejosPopulares[i].beneficiados} \n
        `;

    if (json.consejosPopulares[i].comentario) {
      texto += `_${json.consejosPopulares[i].comentario}_\n`;
    }
    texto += "\n";
  }

  texto += `\n
    *Totales* _${json.fecha} _\n
    🙋‍♂ *Voluntarios: ${json.total_voluntarios} *\n
    😓 Ausentes: *${json.total_ausentes} *\n
    🏠 *Casas: ${json.total_casas} *\n
    👴 *Beneficiados: ${json.total_beneficiados} *\n
    `;

  let cant_na = json.nuevos_activos.length;
  if (cant_na) {
    texto += `*Nuevos Activos:*${cant_na}\n`;
    for (let i = 0; i < cant_na; i++) {
      texto += `  • ${json.nuevos_activos[i]} \n`;
    }
    texto += "\n";
  }

  let cant_rb = json.reportes_baja.length;
  if (cant_rb) {
    texto += `*Reportes de Baja:* ${cant_rb}\n`;
    for (let i = 0; i < cant_rb; i++) {
      texto += `  • ${json.reportes_baja[i]}\n`;
    }
    texto += "\n";
  }

  if (json.comentario) {
    texto += `_${json.comentario}_`;
  }

  return texto;
}
