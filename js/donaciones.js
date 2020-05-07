/** Acción del botón de Crear Parte
 */
function crearParte(){
    let parte = new ParteDonaciones();

    parte.fecha = formatoFecha($('#date').val()); //Fecha

    parte.municipios.push(new ParteMunicipio());
    parte.municipios[0].nombre = municipio.val(); //Municipio

    parte.municipios[0].cujae = parseInt($('#d-cujae').val()) || 0;
    parte.municipios[0].reserva = parseInt($('#d-reserva').val()) || 0;
    parte.municipios[0].incidencias = $('#d-incidencias').val();

    let area = $('#vista-previa').addClass('card');
    //formato para Web y Whatsapp
    let html = parteHTML(parte);
    let texto = parteTexto(parte);

    //Añadiendo clase para css de la vista previa y incrustando el parte en el formato HTML

    area.html(html);

    //Visualizacion del parte en formato texto para enviar a whatsapp y su botón
    area.append('<textarea  class="form-control">'+ texto +'</textarea>');
    area.append('<a class="btn btn-info" href="whatsapp://send?text=' + encodeURIComponent(texto) +'" target="_blank" ' +
        ' action="share/whatsapp/share" >Enviar por Whatsapp</a>');
}


function parteTexto(json) {
    let texto = '*'+ json.municipios[0].nombre + '*\n' +
        'Día: ' + json.fecha +'\n' +
        '❣ Donantes Cujae: *' + json.municipios[0].cujae + '*\n' +
        '🔸 Reserva: *' + json.municipios[0].reserva + '*\n' +
        'Incidencias: \n' + json.municipios[0].incidencias + '\n';

    return texto;
}

function parteHTML(json) {
    let html = '<h4 class="font-weight-bold">'+ json.municipios[0].nombre +'</h4>'+
        '<h5>Día: '+ json.fecha  +'</h5>' +
        '<h6><i class="fa fa-chevron-right"></i>  Donantes Cujae: '+ json.municipios[0].cujae  +'</h6>' +
        '<h6><i class="fa fa-chevron-right"></i>  Reserva: '+ json.municipios[0].reserva  +'</h6>' +
        '<h6>Incidencias: </h6>' +
        '<div class="v-comentario"><p>'+ json.municipios[0].incidencias +'</p></div>';

    return html;
}
