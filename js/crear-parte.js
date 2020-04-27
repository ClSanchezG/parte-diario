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

    let newFecha = dd+'/'+mm+'/'+yyyy;
    if (newFecha === '//'){
        let date = new Date();
        newFecha = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    }
    return newFecha;
}

/** Acción del botón de Crear Parte
 */
function crearParte(){
    let parte = new ParteGeneral();

    parte.fecha = formatoFecha($('#date').val()); //Fecha

    parte.municipios.push(new ParteMunicipio());
    parte.municipios[0].nombre = municipio.val(); //Municipio

    parte.municipios[0].activos = parseInt($('#m-activos').val()) || 0;
    parte.municipios[0].bajas = parseInt($('#m-bajas').val()) || 0;
    parte.municipios[0].coordinacion = parseInt($('#m-coordinacion').val()) || 0;

    acumulado = {
        e : 0, // acumulando estudiates
        t : 0, // acumulando trabajadores
        nc : 0, // acumulando no cujae
        b : 0, // acumulando beneficiados
        c : 0, // acumulando casas
        a : 0, // acumulando ausentes
    };


    let cps = document.querySelectorAll('.cp-data');

    for (let i=0 ; i<cps.length ; i++) { //Datos de los Consejos Populares
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

        acumulado.e += parseInt(cpE)  || 0;
        nuevo_cp.estudiantes = parseInt(cpE) || 0;

        acumulado.t += parseInt(cpT) || 0;
        nuevo_cp.trabajadores = parseInt(cpT) || 0;

        acumulado.nc += parseInt(cpNC) || 0
        nuevo_cp.no_cujae = parseInt(cpNC) || 0;

        acumulado.c += parseInt(cpC) || 0;
        nuevo_cp.casas = parseInt(cpC) || 0;

        acumulado.b += parseInt(cpB) || 0;
        nuevo_cp.beneficiados = parseInt(cpB) || 0;

        acumulado.a += parseInt(cpA) || 0;
        nuevo_cp.ausentes = parseInt(cpA) || 0;


        parte.municipios[0].consejosPopulares.push(nuevo_cp);
    }

    parte.municipios[0].total_ausentes = acumulado.a; //total de Ausentes
    parte.municipios[0].total_voluntarios = acumulado.e + acumulado.t + acumulado.nc; //total de voluntarios (Estudaintes+Trabajadores+NoCujae)
    parte.municipios[0].total_casas = acumulado.c; //total de Casas
    parte.municipios[0].total_beneficiados = acumulado.b; //total de Beneficiados

    let nuevos_activos = $('.na');
    //console.log(nuevos_activos);
    for (let i = 0 ; i<nuevos_activos.length ; i++ ){
        parte.municipios[0].nuevos_activos.push(nuevos_activos[i].value);
    }

    let reportes_baja = $('.rb');

    for (let i = 0 ; i<reportes_baja.length ; i++ ){
        parte.municipios[0].reportes_baja.push(reportes_baja[i].value);
    }

    parte.municipios[0].comentario= $("#comentario").val();

    //formato para Web y Whatsapp
    let html = parteHTML(parte);
    let texto = parteTexto(parte);

    //Añadiendo clase para css de la vista previa y incrustando el parte en el formato HTML
    let area = $('#vista-previa').addClass('card');
    area.html(html);

    //Visualizacion del parte en formato texto para enviar a whatsapp y su botón
    area.append('<textarea  class="form-control">'+ texto +'</textarea>');
    area.append('<a class="btn btn-info" href="whatsapp://send?text=' + encodeURIComponent(texto) +'" target="_blank" ' +
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
    let v = json.municipios[0].activos + json.municipios[0].coordinacion;

    let html = '<h4 class="font-weight-bold">'+ json.municipios[0].nombre +'</h4>'+
        '<h5>Día: '+ json.fecha  +'</h5>' +
        '<h5>Voluntarios: '+ v  +'</h5>' +
        '<h6><i class="fa fa-chevron-right"></i>  Activos: '+ json.municipios[0].activos  +'</h6>' +
        '<h6><i class="fa fa-chevron-right"></i>  Coordinación: '+ json.municipios[0].coordinacion  +'</h6>' +
        '<h6>Bajas: '+ json.municipios[0].bajas  +'</h6>' ;

    for (let i = 0 ; i<json.municipios[0].consejosPopulares.length ; i++) {
        let v_cp = json.municipios[0].consejosPopulares[i].estudiantes +
            json.municipios[0].consejosPopulares[i].trabajadores +
            json.municipios[0].consejosPopulares[i].no_cujae;
        html += '<div class="v-cp card">' +
            '<h6 class="font-weight-bold">Consejo Popular: ' + json.municipios[0].consejosPopulares[i].nombre + '</h6>' +
            '<p>Voluntarios: ' + v_cp + '<br>' +
            '  <i class="fa fa-chevron-right"></i> Estudiantes: ' + json.municipios[0].consejosPopulares[i].estudiantes + '<br>' +
            '  <i class="fa fa-chevron-right"></i> Trabajadores: '+ json.municipios[0].consejosPopulares[i].trabajadores + '<br>' +
            '  <i class="fa fa-chevron-right"></i> No Cujae: '+ json.municipios[0].consejosPopulares[i].no_cujae + '<br>' +
            '<i>Ausentes: '+ json.municipios[0].consejosPopulares[i].ausentes + '</i></p>' +
            '<p>Casas: '+ json.municipios[0].consejosPopulares[i].casas + '<br>' +
            'Beneficiados: '+ json.municipios[0].consejosPopulares[i].beneficiados + '</p>' +
            '<div class="v-comentario"><p>'+ json.municipios[0].consejosPopulares[i].comentario +'</p></div>' +
            '</div>';
    }

    html += '<h5 class="font-weight-bold"> <u>Totales <span class="font-italic font-weight-light">'+ json.fecha +'</span></u> </h5>' +
        '<h6><i class="fa fa-chevron-right"></i>  Voluntarios: '+ json.municipios[0].total_voluntarios +'</h6>'+
        '<h6><i class="fa fa-chevron-right"></i>  Ausentes: '+ json.municipios[0].total_ausentes + '</h6>' +
        '<h6><i class="fa fa-chevron-right"></i>  Casas: '+ json.municipios[0].total_casas +'</h6>' +
        '<h6><i class="fa fa-chevron-right"></i>  Beneficiados: '+ json.municipios[0].total_beneficiados +'</h6>';

    let cant_na = json.municipios[0].nuevos_activos.length;
    if (cant_na){
        html += '<div><h6 class="font-weight-bold">Nuevos Activos: ' + cant_na + '</h6>';
        for (let i=0 ; i<cant_na ; i++){
            html += '<h6>  <i class="fa fa-chevron-right"></i> '+ json.municipios[0].nuevos_activos[i] +'</h6>'
        }
        html += '</div>';
    }

    let cant_rb = json.municipios[0].reportes_baja.length;
    if (cant_rb){
        html += '<div><h6 class="font-weight-bold">Reportes de Bajas: ' + cant_rb + '</h6>';
        for (let i=0 ; i<cant_rb ; i++){
            html += '<h6>  <i class="fa fa-chevron-right"></i> '+ json.municipios[0].reportes_baja[i] +'</h6>'
        }
        html += '</div>';
    }

    html += '<div class="v-comentario"><p>'+ json.municipios[0].comentario +'</p></div>';

    return html;
}

/** genera el parte en formato texto para ser enviado a Whatsapp
 * @param json formato de datos
 * @returns {string} Listo para enviar a mensaje de Whatsapp
 */
function parteTexto(json) {
    let v = json.municipios[0].activos + json.municipios[0].coordinacion;
    let texto = '*'+ json.municipios[0].nombre + '*\n' +
        'Día: ' + json.fecha +'\n' +
        'Voluntarios: *' + v + '*\n' +
        ' • Activos: ' + json.municipios[0].activos + '\n' +
        ' • Coordinación: ' + json.municipios[0].coordinacion + '\n' +
        'Bajas: ' + json.municipios[0].bajas + '\n\n';

    for (let i = 0 ; i<json.municipios[0].consejosPopulares.length ; i++){
        let v_cp = json.municipios[0].consejosPopulares[i].estudiantes +
            json.municipios[0].consejosPopulares[i].trabajadores +
            json.municipios[0].consejosPopulares[i].no_cujae;
        texto +=  '*Consejo Popular: ' + json.municipios[0].consejosPopulares[i].nombre + '*\n' +
            '  Voluntarios Hoy: ' + v_cp + '\n' +
            '    • Estudiantes: ' + json.municipios[0].consejosPopulares[i].estudiantes + '\n' +
            '    • Trabajadores: ' + json.municipios[0].consejosPopulares[i].trabajadores + '\n' +
            '    • No Cujae: '+ json.municipios[0].consejosPopulares[i].no_cujae + '\n' +
            '  _Ausentes: '+ json.municipios[0].consejosPopulares[i].ausentes + '_\n' +
            '  Casas: '+ json.municipios[0].consejosPopulares[i].casas + '\n' +
            '  Beneficiados: '+ json.municipios[0].consejosPopulares[i].beneficiados + '\n';
        if (json.municipios[0].consejosPopulares[i].comentario){
            texto += '_' + json.municipios[0].consejosPopulares[i].comentario + '_\n';
        }
        texto += '\n';
    }

    texto += '\n' +
        '*Totales* _'+ json.fecha +'_\n' +
        '  🙋‍♂ *Voluntarios: ' + json.municipios[0].total_voluntarios + '*\n'+
        '  😓 Ausentes: *' + json.municipios[0].total_ausentes + '*\n'+
        '  🏠 *Casas: ' + json.municipios[0].total_casas + '*\n'+
        '  👴 *Beneficiados: ' + json.municipios[0].total_beneficiados + '*\n';

    let cant_na = json.municipios[0].nuevos_activos.length;
    if (cant_na) {
        texto += '*Nuevos Activos:* ' + cant_na + '\n';
        for (let i = 0; i < cant_na; i++) {
            texto += '  • ' + json.municipios[0].nuevos_activos[i] + '\n';
        }
        texto += '\n';
    }

    let cant_rb = json.municipios[0].reportes_baja.length;
    if (cant_rb) {
        texto += '*Reportes de Baja:* ' + cant_rb + '\n';
        for (let i = 0; i < cant_rb; i++) {
            texto += '  • ' + json.municipios[0].reportes_baja[i] + '\n';
        }
        texto += '\n';
    }

    if (json.municipios[0].comentario){
        texto += '_' + json.municipios[0].comentario + '_';
    }

    return texto;
}

