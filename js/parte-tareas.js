// Esta es la forma en que se crean los partes, se almacenan las cosas en un objeto y despues se transforma a html y a texto
/** Acción del botón de Crear Parte
 */
function crearParte() {
  let parte = new ParteTareas();
  parte.fecha = Date.now(); //Fecha
  parte.universidad = universidad.val(); //Universidad
  parte.total_voluntarios = 0;

  //Tareas
  let tareas = $(".covid-form");

  for (let i = 0; i < tareas.length; i++) {
    let t = new Tareas();
    t.nombre = tareas[i].querySelector("#tarea-" + i).value;
    let mun = $("#tarea-form-" + i + " .input-group").length;
    for (let j = 0; j < mun; j++) {
      let m = new TareasMun();
      m.municipio = $("#select-mun-" + i + "-" + j).val();
      m.cantidad = $("#tarea-cant-" + i + "-" + j).val();
      t.total += parseInt(m.cantidad);
      t.municipio_tarea.push(m);
    }
    if (t.total.toString() !== "NaN") {
      parte.total_voluntarios += t.total;
    }
    parte.tareas.push(t);
  }

  //parte.total_voluntarios = 50;

  //Comprobar si el numero de activos es mayor que el total de voluntarios
  //if (parte.activos >= parte.total_voluntarios) {
  //formato para Web y Whatsapp
  let html = parteHTML(parte);
  let texto = parteTexto(parte);

  //Añadiendo clase para css de la vista previa y incrustando el parte en el formato HTML

  let area = $("#vista-previa").addClass("card");
  area.html(html);

  //Visualizacion del parte en formato texto para enviar a whatsapp y su botón
  area.append(
    `<textarea class="form-control" id="copytextarea">${texto}</textarea>`
  );
  area.append(
    `<a class="btn btn-info" href="https://telegram.me/share/url?url=${encodeURI(
      "Parte Semanal"
    )}&text=${encodeURIComponent(
      texto
    )}" target="_blank" action="share/telegram/share" >
    Enviar por Telegram
    </a>`
  );

  area.append(
    `<button class="btn btn-secondary " id="textareacopybtn" onclick="copyToClipboard()">
    Copiar al Portapapeles
    </button>`
  );

  //window.localStorage.setItem("parte", JSON.stringify(parte));
  //console.log(parte);
  //console.log(parteHtml);
  //console.log(parteTexto);
}
/** Genera el parte en formato HTML
 * @param json formato de datos
 * @returns {string} listo para añadir al elemento contenedor
 */
function parteHTML(json) {
  const fechaActual = formatoFechaCompleta(json.fecha);

  let html = `
    <h3 class="font-weight-bold">${json.universidad}</h3>
    <h4>Día: ${fechaActual}</h4>
    <h5><i class="fa fa-chevron-right"></i>  Total voluntarios: ${json.total_voluntarios}</h5>
    <h4>Tareas: </h4>`;
  for (let i = 0; i < json.tareas.length; i++) {
    if (json.tareas[i].total > 0) {
      html += `<h5>${json.tareas[i].nombre}: ${json.tareas[i].total}</h5>`;
      for (let j = 0; j < json.tareas[i].municipio_tarea.length; j++) {
        if (json.tareas[i].municipio_tarea[j].municipio !== "NO SELECCIONADO") {
          html += `<h6>${json.tareas[i].municipio_tarea[j].municipio}: ${json.tareas[i].municipio_tarea[j].cantidad}</h6>`;
        }
      }
      html += `---------------------------------------------------`;
    }
  }

  return html;
}

/** genera el parte en formato texto para ser enviado a Whatsapp
 * @param json formato de datos
 * @returns {string} Listo para enviar a mensaje de Whatsapp
 */
function parteTexto(json) {
  const fechaActual = formatoFechaCompleta(json.fecha);

  let texto = `**${json.universidad}**\n
🗓 Fecha: ${fechaActual} \n
💚 Total de voluntarios: ${json.total_voluntarios} \n
📝 Tareas:\n`;

  for (let i = 0; i < json.tareas.length; i++) {
    if (json.tareas[i].total > 0) {
      texto += `   • ${json.tareas[i].nombre}: ${json.tareas[i].total}\n`;
      for (let j = 0; j < json.tareas[i].municipio_tarea.length; j++) {
        if (json.tareas[i].municipio_tarea[j].municipio !== "NO SELECCIONADO") {
          texto += `      + ${json.tareas[i].municipio_tarea[j].municipio} : ${json.tareas[i].municipio_tarea[j].cantidad}\n`;
        }
      }
    }
  }

  return texto;
}
