let municipio = $('#municipio');

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

$(document).ready(function () {
    municipio.html('<option value="0">-</option>');
    $.each(municipios, function (index, value) {
        municipio.append('<option value="'+ value.nombre +'">'+ value.nombre +'</ooption>');
    });
    $('#consejo-popular').disabled = true;
    let consejosPopulares = $('.cp-data');
    $.each(consejosPopulares, function (index,value) {
        updateTotalVoluntario(index);
    });

    addconsejoPopular();
});


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
        ' <div class="text-right">' +
        ' <button class="btn btn-danger btn-sm" onclick="deleteConsejoPopular('+ count +')">Eliminar</button>' +
        ' </div>' +
        '</div>'
    );
    let mun = $('#municipio').val();
    let cps = getConsejosPopulares();
    $('#cp'+count).html('<option value="0">-</option>').disabled = false;
    $.each(cps, function (index, value) {
        if (value.municipio === municipio.val()){
            $('#cp'+count).append('<option value="'+ value.cp +'">'+ value.cp +'</ooption>');
        }
    });

}

function deleteConsejoPopular(idCP) {
    $("#cp-form"+ idCP ).remove();
}

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

function createPreview(){
    let date = formatoFecha($('#date').val());
    let area = $('#vista-previa').addClass('card');
    area.html(
        '<h4>'+ municipio.val() +'</h4>'+
        '<h5>Día: '+ date +'</h5>'
    );

    let text = '*'+ municipio.val() + '*\n' +
        'Día: ' + date +'\n\n';

    let e = 0;
    let t = 0;
    let nc = 0;
    let b = 0;

    let cps = document.querySelectorAll('.cp-data');
    console.log(cps);
    for (let i=0 ; i<cps.length ; i++) {
        let cp = cps[i].querySelector(".consejo-popular").value;
        let cpE = cps[i].querySelector(".voluntario-e").value;
        let cpT = cps[i].querySelector(".voluntario-t").value;
        let cpNC = cps[i].querySelector(".voluntario-nc").value;
        let cpB = cps[i].querySelector(".beneficiado").value;

        text += 'Consejo Popular: *' + cp + '*\n';

        let toAppend = '<div class="v-cp card">' +
            '<h6>Consejo Popular: ' + cp + '</h6>';

        if (cpE) {
            text += '  -Estudiantes: *' + cpE + '*\n';
            e += parseInt(cpE);
            toAppend += '<span>Estudiantes: ' + cpE + '</span>';
        }

        if (cpT) {
            text += '  -Trabajadores: *' + cpT + '*\n';
            t += parseInt(cpT);
            toAppend += '<span>Trabajadores: '+ cpT + '</span>';
        }

        if (cpNC) {
            text += '  -No Cujae: *'+ cpNC + '*\n';
            nc += parseInt(cpNC);
            toAppend += '<span>No Cujae: '+ cpNC + '</span>';
        }

        if (cpB){
            text += ' Beneficiados: *'+ cpB + '*\n';
            b += parseInt(cpB);
            toAppend += '<span>Beneficiados: '+ cpB + '</span>';
        }
        text += '\n';
        toAppend += '</div>';

        console.log(toAppend);

        area.append(toAppend);
    }

    let vt = e + t + nc;

    text += '*Total Voluntarios: ' + vt + '*\n'+
        '*Total Beneficiados: ' + b + '*\n';

    area.append('<h6>Total Voluntarios: '+ vt +'</h6>'+
        '<h6>Total Beneficiados: '+ b +'</h6>');
    area.append('<textarea class="form-control">'+ text +'</textarea>');
    area.append('<a class="btn btn-info" href="https://wa.me/?text=' + text +'" target="_blank">Enviar por Whatsapp</a>')
}
