let municipio = $('#municipio');
const json_format =  {
    fecha: '',
    municipios: [
        {
            nombre: '',
            consejosPopulares: [
                {
                    nombre: '',
                    estudiantes: '',
                    trabajadores: '',
                    no_cujae: '',
                    ausentes: '',
                    beneficiados: '',
                },
            ],
            comentario: '',
            total_ausentes: '',
            total_voluntarios: '',
            total_beneficiados: '',
        }
    ],
}; //Estructura de Datos

/** Obtiene los consejos Populares correspondientes con sus municipios
 * @returns {[]} arreglo de consejos populares (municipio, cp)
 */
function getConsejosPopulares() {
    let cps = [];
    for (let i = 0; i < municipios.length; i++) {
        let municipio = municipios[i];
        for (let j = 0; j<municipio.cp.length ; j++) {
            cps.push({
                municipio : municipio.nombre,
                cp : municipio.cp[j]
            })
        }
    }
    return cps;
}

/** Al iniciar el documento se rellenan las listas desplegables de los municipios y se crea un
 * consejo Popular
 */
$(document).ready(function () {
    municipio.html('<option value="0">-</option>');
    $.each(municipios, function (index, value) {
        municipio.append('<option value="'+ value.nombre +'">'+ value.nombre +'</ooption>');
    });
    $('#consejo-popular').disabled = true;
    let consejosPopulares = $('.cp-data');
    $.each(consejosPopulares, function (index) {
        updateTotalVoluntario(index);
    });

    addconsejoPopular();
});

/** Al cambiar de municipio se actualizan las listas desplegables de los Consejos Populares
 */
municipio.on('change',function () {
    let cps = getConsejosPopulares();
    $('.consejo-popular').html('<option value="0">-</option>').disabled = false;
    let mun = $(this).val();
    $.each(cps, function (index, value) {
        if (value.municipio === mun){
            $('.consejo-popular').append('<option value="'+ value.cp +'">'+ value.cp +'</ooption>');
        }
    });
    municipio = $(this);
});

/** Actualiza el total de voluntarios del CP
 * @param idCP id numerico del consejo popular a actualizar
 */
function updateTotalVoluntario(idCP) {
    console.log('updating ' + idCP);
    let cp = document.querySelector("#cp-form"+idCP);
    let e = cp.querySelector(".voluntario-e");
    let t = cp.querySelector(".voluntario-t");
    let nc = cp.querySelector(".voluntario-nc");
    let tv = cp.querySelector(".total-voluntario");

    let total = 0;
    if(e.value){
        total += parseInt(e.value);
    }
    if(t.value){
        total += parseInt(t.value);
    }
    if(nc.value){
        total += parseInt(nc.value);
    }
    tv.innerHTML = "Voluntarios: "+total;
}

/** Accion del Boton de añadir consejo Popular
 */
function addconsejoPopular() {
    let container = $('#cp-container');
    let count = $('.cp-data').length;
    console.log(count);
    container.append('<div class="cp-data card" id="cp-form'+ count +'">'+
        ' <div class="form-group">' +
        '   <label for="cp'+ count +'">Consejo Popular</label>\n' +
        '   <select class="form-control consejo-popular" id="cp'+ count +'" name="cp">' +
        '   </select>' +
        ' </div>' +
        ' <div class="card">' +
        ' <h5 class="total-voluntario">Voluntarios: 0</h5>' +
        ' <div class="form-group">' +
        ' <label for="estudiante-'+ count +'">Estudiantes</label>' +
        ' <input class="form-control voluntario-e" onchange="updateTotalVoluntario('+ count +')" name="e" type="number" id="estudiante-'+ count +'" min="0">' +
        ' </div>' +
        ' <div class="form-group">' +
        ' <label for="trabajador-'+ count +'">Trabajadores</label>' +
        ' <input class="form-control voluntario-t" onchange="updateTotalVoluntario('+ count +')" name="t" type="number" id="trabajador-'+ count +'" min="0">' +
        ' </div>' +
        ' <div class="form-group">' +
        ' <label for="no-cujae-'+ count +'">No Cujae</label>' +
        ' <input class="form-control voluntario-nc" onchange="updateTotalVoluntario('+ count +')" name="nc" type="number" id="no-cujae-'+ count +'" min="0">' +
        ' </div>' +
        ' </div>' +
        ' <div class="form-group">' +
        ' <label for="beneficiado-'+ count +'">Beneficiados</label>' +
        ' <input class="form-control beneficiado" name="b" type="number" id="beneficiado-'+ count +'" min="0">' +
        ' </div>' +
        ' <div class="form-group">' +
        ' <label for="ausente-'+ count +'">Ausentes</label>' +
        ' <input class="form-control ausente" name="a" type="number" id="ausente-'+ count +'" min="0">' +
        ' </div>' +
        ' <div class="text-right">' +
        ' <button class="btn btn-danger btn-sm" onclick="deleteConsejoPopular('+ count +')">Eliminar</button>' +
        ' </div>' +
        '</div>'
    );
    let cps = getConsejosPopulares();
    $('#cp'+count).html('<option value="0">-</option>').disabled = false;
    $.each(cps, function (index, value) {
        if (value.municipio === municipio.val()){
            $('#cp'+count).append('<option value="'+ value.cp +'">'+ value.cp +'</ooption>');
        }
    });

}

/** Acción del poton eliminar del consejo Popular
 * @param idCP identificador numérico del consejo popular a eliminar
 */
function deleteConsejoPopular(idCP) {
    $("#cp-form"+ idCP ).remove();
}

/** Acción del botón de Crear Parte
 */
function createVistaPrevia(){
    let json =  json_format;

    json.municipios[0].nombre = municipio.val(); //Municipio
    json.fecha = formatoFecha($('#date').val()); //Fecha

    let e = 0;
    let t = 0;
    let nc = 0;
    let b = 0;
    let a = 0;

    let cps = document.querySelectorAll('.cp-data');

    for (let i=0 ; i<cps.length ; i++) { //Datos de los Consejos Populares
        let cp = cps[i].querySelector(".consejo-popular").value;
        let cpE = cps[i].querySelector(".voluntario-e").value;
        let cpT = cps[i].querySelector(".voluntario-t").value;
        let cpNC = cps[i].querySelector(".voluntario-nc").value;
        let cpB = cps[i].querySelector(".beneficiado").value;
        let cpA = cps[i].querySelector(".ausente").value;

        json.municipios[0].consejosPopulares[i].nombre = cp; //Nombre Consejo popular

        if (cpE) { //Estudiantes
            e += parseInt(cpE);
            json.municipios[0].consejosPopulares[i].estudiantes = parseInt(cpE);
        }

        if (cpT) { //Trabajadores
            t += parseInt(cpT);
            json.municipios[0].consejosPopulares[i].trabajadores = parseInt(cpT);
        }

        if (cpNC) { //No cujae
            nc += parseInt(cpNC);
            json.municipios[0].consejosPopulares[i].no_cujae = parseInt(cpNC);
        }

        if (cpB){ //Beneficiados
            b += parseInt(cpB);
            json.municipios[0].consejosPopulares[i].beneficiados = parseInt(cpB);
        }

        if (cpA){ //Ausentes
            a += parseInt(cpA);
            json.municipios[0].consejosPopulares[i].ausentes = parseInt(cpA);
        }

    }

    json.municipios[0].total_ausentes = a; //total de Ausentes
    json.municipios[0].total_voluntarios = e + t + nc; //total de voluntarios (Estudaintes+Trabajadores+NoCujae)
    json.municipios[0].total_beneficiados = b; //total de Beneficiados
    json.municipios[0].comentario= $("#comentario").val();

    //formato para Web y Whatsapp
    let parteHtml = parteHTML(json);
    let parteTexto = parteTexto(json);

    //Añadiendo clase para css de la vista previa y incrustando el parte en el formato HTML
    let area = $('#vista-previa').addClass('card').html(parteHtml);

    //Visualizacion del parte en formato texto para enviar a whatsapp y su botón
    area.append('<textarea  class="form-control">'+ parteTexto +'</textarea>');
    area.append('<a class="btn btn-info" href="whatsapp://send?text=' + encodeURIComponent(parteTexto) +'" target="_blank" ' +
        ' action="share/whatsapp/share" >Enviar por Whatsapp</a>');

    //console.log(json);
    //console.log(parteHtml);
    //console.log(parteTexto);
}

/** Genera el parte en formato HTML
 * @param json formato de datos
 * @returns {string} listo para añadir al elemento contenedor
 */
function parteHTML(json) {
    let html = '<h4>'+ json.municipios[0].nombre +'</h4>'+
        '<h5>Día: '+ json.fecha  +'</h5>';

    for (let i = 0 ; i<json.municipios[0].consejosPopulares.length ; i++) {
        html += '<div class="v-cp card">' +
            '<h6>Consejo Popular: ' + json.municipios[0].consejosPopulares[i].nombre + '</h6>' +
            '<span>Estudiantes: ' + json.municipios[0].consejosPopulares[i].estudiantes + '</span>' +
            '<span>Trabajadores: '+ json.municipios[0].consejosPopulares[i].trabajadores + '</span>' +
            '<span>No Cujae: '+ json.municipios[0].consejosPopulares[i].no_cujae + '</span>' +
            '<span>Beneficiados: '+ json.municipios[0].consejosPopulares[i].beneficiados + '</span>' +
            '<span>Ausentes: '+ json.municipios[0].consejosPopulares[i].ausentes + '</span>' +
            '</div>';
    }

    html += '<span>Total Ausentes: '+ json.municipios[0].total_ausentes + '</span>' +
        '<br>' +
        '<h6>Total Voluntarios: '+ json.municipios[0].total_voluntarios +'</h6>'+
        '<h6>Total Beneficiados: '+ json.municipios[0].total_beneficiados +'</h6>' +
        '<div id="v-comentario"><p>'+ json.municipios[0].comentario +'</p></div>';

    return html;
}

/** genera el parte en formato texto para ser enviado a Whatsapp
 * @param json formato de datos
 * @returns {string} Listo para enviar a mensaje de Whatsapp
 */
function parteTexto(json) {
    let texto = '*'+ json.municipios[0].nombre + '*\n' +
        'Día: ' + json.fecha +'\n\n';

    for (let i = 0 ; i<json.municipios[0].consejosPopulares.length ; i++){
        texto +=  'Consejo Popular: *' + json.municipios[0].consejosPopulares[i].nombre + '*\n' +
            '  -Estudiantes: *' + json.municipios[0].consejosPopulares[i].estudiantes + '*\n' +
            '  -Trabajadores: *' + json.municipios[0].consejosPopulares[i].trabajadores + '*\n' +
            '  -No Cujae: *'+ json.municipios[0].consejosPopulares[i].no_cujae + '*\n' +
            ' Beneficiados: *'+ json.municipios[0].consejosPopulares[i].beneficiados + '*\n' +
            ' Ausentes: *'+ json.municipios[0].consejosPopulares[i].ausentes + '*\n';
    }

    texto += '\n' +
        'Total Ausentes: *' + json.municipios[0].total_ausentes + '*\n'+
        '*Total Voluntarios: ' + json.municipios[0].total_voluntarios + '*\n'+
        '*Total Beneficiados: ' + json.municipios[0].total_beneficiados + '*\n\n  ' +
        '_' + json.municipios[0].comentario + '_';

    return texto;
}

/** Formato dd/mm/yyyy para el input de fecha
 * @param date valor obtenido por el input de fecha
 * @returns {string} fecha en formato dd/mm/yyyy
 */
function formatoFecha(date) {
    let dd = '';
    let mm = '';
    let yyyy = '';
    for (let i = 0 ; i<date.length ; i++){
        if(i<4) {
            yyyy += date[i];
        }
        else if(i>4 && i<7){
            mm += date[i];
        }
        else if(i>7){
            dd += date[i];
        }
    }
    return dd+'/'+mm+'/'+yyyy;
}
