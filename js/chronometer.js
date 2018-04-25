/**
 * Método para el cronómetro. Cronómetro utilizado de:
 * http://codigoprogramacion.com/cursos/javascript/control-de-tiempo-usando-setinterval-practica-cronometro-en-javascript.html#.WuDCESF97fs
 */
function setTime() { 
    contador_s = 0;
    contador_m = 0;
    s = document.getElementById("seconds");
    m = document.getElementById("minutes");

    cronometro = setInterval(
        function () {
            if (contador_s == 60) {
                contador_s = 0;
                contador_m++;
                m.innerHTML = contador_m;
                if (contador_m == 60) {
                    contador_m = 0;
                }
            }
            s.innerHTML = contador_s;
            contador_s++;
        }, 1000);
}

var cronometro;
