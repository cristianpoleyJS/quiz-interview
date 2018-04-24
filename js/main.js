$.ajax({
    // la URL para la petición
    url : 'http://dws.aonate.lab.cloudioo.net/prueba-front/get',
 
    // especifica si será una petición POST o GET
    type : 'GET',
    
    // Se espera como tipo de dato devuelto por el servicio un 'jsonp'
    dataType: "jsonp",

    // código a ejecutar si la petición es satisfactoria;
    // la respuesta es pasada como argumento a la función
    success : function(json) {
        var question = '';
        var count    = 0;

        // Guardamos en el localStorage los datos de la consulta    
        localStorage.setItem("data", JSON.stringify(json.data));
        // Recorremos cada pregunta
        json.data.forEach(elem => {
            count += 1;
            question = '<div class="header-question">' + count + '/3' + '</div>';
            question += '<div class="question"><h5 class="title-question">' + elem.question + '</h5>';
            // Recorremos cada respuesta de la actual pregunta
            question += '<div class="answers">';
            elem.answers.forEach(answer => {
                question += '<div class="answer"><img class="image-answer" src="' + answer.image + '"/>';
                question += '<p>' + answer.text + '<p/></div>';
            });
            question += '</div>';
            $('.content').append(question + '</div>');            
        });
    },
 
    // código a ejecutar si la petición falla;
    // son pasados como argumentos a la función
    // el objeto de la petición en crudo y código de estatus de la petición
    error : function(xhr, status) {
        alert('Disculpe, existió un problema');
    },
 
    // código a ejecutar sin importar si la petición falló o no
    complete : function(xhr, status) {
        
    }
});

function initQuiz() {
    $(".home").show().animate({ display: 'none !important' })
    $(".content").show().animate({ display: 'initial' })
    // console.log(JSON.parse(localStorage.getItem("data")));
}

function finishQuiz() {
}