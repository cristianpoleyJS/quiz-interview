/**
 * Invoca al servicio
 */
function getData() {
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
            // Guardamos en el localStorage los datos de la consulta    
            localStorage.setItem("data", JSON.stringify(json.data));
            
            // Puntuación del Quiz
            localStorage.setItem('score', 0);

            // Recorro todos los datos devueltos por el servicio y voy creando los divs necesarios
            var question = '';
            json.data.forEach((elem, index) => {
                index += 1;   
                question = '<div class="question" id="question' + index + '">';
                question += '<div class="header-question">' + index + '/' + json.data.length;
                question += '<img src="assets/images/equis-white.png" onclick="cancelQuiz()" class="cancel-quiz">';
                question += '</div>';
                question += '</div>';
                // Guardamos en el localStorage cada pregunta y sus respuestas
                localStorage.setItem("question" + index, JSON.stringify(json.data[index - 1]));
                // Lo añadimos al HTML
                $('.content').append(question);
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
}

/**
 * Función invocada cuando se inicia el Quiz
 */
function initQuiz() {
    $('.home').css('display', 'none' );
    var question1 = createQuestion(JSON.parse(localStorage.getItem('question1')), 1);
    $('#question1').append(question1);  
    $('#question1').css('display', 'inherit');
    this.setTime();
}

/**
 * Método invocado al clicar en una respuesta de las posibles respuestas de una pregunta
 */
function next(currentQuestion, score) {
    // Actualizamos la puntuación total del Quiz
    localStorage.setItem('score', score + parseInt(localStorage.getItem('score')));
    
    // Si es la última pregunta invocamos a finishQuiz()
    if (currentQuestion == JSON.parse(localStorage.getItem('data')).length) {
        $('#question' + currentQuestion).css('display', 'none');
        this.finishQuiz();
    } else {
        // Rellenamos el nuevo div
        var newQuestion = createQuestion(JSON.parse(localStorage.getItem('question' + parseInt(currentQuestion + 1))), currentQuestion + 1);
        $('#question' + parseInt(currentQuestion + 1)).append(newQuestion);

        // Pasamos a la siguiente pregunta
        $('#question' + currentQuestion).css('display', 'none');
        $('#question' + parseInt(currentQuestion + 1)).css('display', 'inherit');
    }
}

/**
 * Método invocado al clicar en la "X" de las cabeceras de las preguntas, al lado
 * del número de la pregunta actual, y en la ventana del resultado. Cancela el Quiz y vuelve a la pantalla principal.
 */
function cancelQuiz() {
    // Ocultamos todos el contenido y restauramos el valor del score
    $('.home').css('display', 'inherit');
    $('.content').children().remove();
    $('.results').css('display', 'none');
    localStorage.setItem('score', 0);
    this.getData();
    clearInterval(cronometro);
}

/**
 * Método para finalizar el Quiz, mostrando la pantalla de resultado.
 */
function finishQuiz() {
    $('.results').show();
    $('#score').html(localStorage.getItem('score'));
    clearInterval(cronometro);
}

/**
 * Función para devolver el HTML montado según los datos que reciba por parámetro
 * @param {*} data : Los datos con los que se va a montar el HTML 
 */
function createQuestion(data, currentQuestion) {
    var html = 
        '<h5 class="title-question">' + data.question + '</h5>' +
        '<div class="answers w3-row">';
        data.answers.forEach(elem => {
            html += '<div class="answer w3-col s6" onclick="next(' + parseInt(currentQuestion) + ',' + parseInt(elem.score) + ')"><img class="image-answer" src="' + elem.image + '">';
            html += '<p>' + elem.text + '</p>';
            html += '</div>';
        });
    html += '</div>';

    return html;
}

// Se invoca al servicio cada vez que carga el fichero, es decir, cada vez que carga la página
this.getData();