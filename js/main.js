//Inicialización de variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRegresivoId = null;

//Apuntando a documento HTML
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");

//Generación de números aleatorios
let number = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
number = number.sort(() => {return Math.random()-0.5})
console.log(number);

//Funciones
function contarTiempo() {
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
        }
    },1000);
}

function bloquearTarjetas() {
    for (let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = number[i];
        tarjetaBloqueada.disabled = true;
    }
}

//Función principal
function destapar(id) {

    if (temporizador == false) {
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1 ) {
        //Mostrar el primer número
        tarjeta1 = document.getElementById(id);
        primerResultado = number[id];
        tarjeta1.innerHTML = primerResultado;

        //Deshabilitar el primer botón
        tarjeta1.disabled = true;
    } else if(tarjetasDestapadas == 2) {
        //Mostrar segundo número
        tarjeta2 = document.getElementById(id);
        segundoResultado = number [id];
        tarjeta2.innerHTML = segundoResultado;

        //Deshabilitar el segundo botón
        tarjeta2.disabled = true;

        //Incrementar movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if (primerResultado == segundoResultado) {
            //Encerar contador tarjetas destapadas
            tarjetasDestapadas = 0;

            //Aumentar aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if(aciertos == 8) {
                clearInterval(tiempoRegresivoId);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 😎`;
                mostrarTiempo.innerHTML = `Genial! 🎆 Sólo te demoraste ${timerInicial - timer} segundos`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 🤙🥳️🤙`
            }
        } else {
            //Mostrar momentáneamente valores y volver a tapar
            setTimeout(() =>{
                tarjeta1.innerHTML = " ";
                tarjeta2.innerHTML = " ";
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },800);
        }
    }
}