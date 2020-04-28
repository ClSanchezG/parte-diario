let municipio = $('#municipio');


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
    municipio.html('<option value="NO SELECCIONADO">-</option>');
    $.each(municipios, function (index, value) {
        municipio.append('<option value="'+ value.nombre +'">'+ value.nombre +'</ooption>');
    });
    $('#consejo-popular').disabled = true;
    let consejosPopulares = $('.cp-data');
    $.each(consejosPopulares, function (index) {
        updateTotalVoluntario(index);
    });
    addconsejoPopular();
    $('#close-alerta').on('click;', function (){
        this.preventDefault();
        
    });

});

/** Al cambiar de municipio se actualizan las listas desplegables de los Consejos Populares
 */
municipio.on('change',function () {
    let cps = getConsejosPopulares();
    $('.consejo-popular').html('<option value="NO SELECCIONADO">-</option>').disabled = false;
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
    container.append('<div class="cp-data card" id="cp-form'+ count +'">'+
        ' <div class="form-group">' +
        '   <label for="cp'+ count +'">Consejo Popular</label>\n' +
        '   <select class="form-control consejo-popular" id="cp'+ count +'" name="cp'+ count +'">' +
        '   </select>' +
        ' </div>' +
        ' <div class="card">' +
        ' <h5 class="total-voluntario">Voluntarios: 0</h5>' +
        ' <div class="form-group">' +
        ' <label for="estudiante-'+ count +'">Estudiantes</label>' +
        ' <input class="form-control voluntario-e" onchange="updateTotalVoluntario('+ count +')" name="e'+ count +'" type="number" id="estudiante-'+ count +'" min="0" value="0">' +
        ' </div>' +
        ' <div class="form-group">' +
        ' <label for="trabajador-'+ count +'">Trabajadores</label>' +
        ' <input class="form-control voluntario-t" onchange="updateTotalVoluntario('+ count +')" name="t'+ count +'" type="number" id="trabajador-'+ count +'" min="0" value="0">' +
        ' </div>' +
        ' <div class="form-group">' +
        ' <label for="no-cujae-'+ count +'">No Cujae</label>' +
        ' <input class="form-control voluntario-nc" onchange="updateTotalVoluntario('+ count +')" name="nc'+ count +'" type="number" id="no-cujae-'+ count +'" min="0" value="0">' +
        ' </div>' +
        ' </div>' +
        ' <div class="form-group">' +
        ' <label for="casa-'+ count +'">Casas</label>' +
        ' <input class="form-control casa" name="c'+ count +'" type="number" id="casa-'+ count +'" min="0" value="0">' +
        ' </div>' +
        ' <div class="form-group">' +
        ' <label for="beneficiado-'+ count +'">Beneficiados</label>' +
        ' <input class="form-control beneficiado" name="b'+ count +'" type="number" id="beneficiado-'+ count +'" min="0" value="0">' +
        ' </div>' +
        ' <div class="form-group">' +
        ' <label for="ausente-'+ count +'">Ausentes</label>' +
        ' <input class="form-control ausente" name="a'+ count +'" type="number" id="ausente-'+ count +'" min="0" value="0">' +
        ' </div>' +
        ' <div class="form-group">' +
        ' <label for="comentario-'+ count +'">Comentario</label>' +
        ' <input class="form-control comentario" name="com'+ count +'" type="text" id="comentario-'+ count +'" placeholder="Comentario o nota">' +
        ' </div>' +
        ' <div class="text-right">' +
        ' <button class="btn btn-danger btn-sm" onclick="deleteConsejoPopular('+ count +')">' +
        '  <i class="fa fa-trash"></i> Eliminar</button>' +
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

/** Acción de añadir nuevos activos
 */
function addNuevoActivo() {
    let container = $('#na-container').addClass('card');
    let count = $('.na').length;
    if (count === 0){
        container.append('<h5 id="na-label">Nuevos Activos:</h5>');
    }
    container.append('<div class="na-form row" id="na-form-'+ count +'">' +
        '<span class="col-11"><input class="form-control na col-11" type="text" id="na-'+ count +'" min="0" placeholder="Datos o comentario"></span>' +
        ' <span class="col-1"><button class="btn btn-danger btn-sm" onclick="deleteNuevoActivo('+ count +')"></span>' +
        '<i class="fa fa-trash"></i></button>' +
        '</div>');
}

/** Acción del boton de eliminar Nuevo Activo
 * @param idNA
 */
function deleteNuevoActivo(idNA){
    let count = $('.na').length;
    if (count === 1){
        $("#na-label").remove();
        $('#na-container').removeClass('card');
    }
    $("#na-form-"+ idNA ).remove();
}

/** Acción de añadir nuevos activos
 */
function addReporteBaja() {
    let container = $('#rb-container').addClass('card');
    let count = $('.rb').length;
    if (count === 0){
        container.append('<h5 id="rb-label">Reportes de Baja:</h5>');
    }
    container.append('<div class="rb-form row" id="rb-form-'+ count +'">' +
        '<span class="col-11"><input class="form-control rb col-11" type="text" id="rb-'+ count +'" min="0" placeholder="Datos o comentario"></span>' +
        ' <span class="col-1"><button class="btn btn-danger btn-sm" onclick="deleteReporteBaja('+ count +')"></span>' +
        '<i class="fa fa-trash"></i></button>' +
        '</div>');
}

/** Acción del boton de eliminar Nuevo Activo
 * @param idNA
 */
function deleteReporteBaja(idNA){
    let count = $('.rb').length;
    if (count === 1){
        $("#rb-label").remove();
        $('#rb-container').removeClass('card');
    }
    ("#rb-form-"+ idNA ).remove();
}
