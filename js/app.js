document.addEventListener('DOMContentLoaded', () => {
    escucharInputs();
    validarCustom();
});

const botones = document.querySelectorAll('.boton-propina');
const inputsNumber = document.querySelectorAll('.input__number');
const botonReset = document.querySelector('.reset');
const inputCustom = document.querySelector('.custom');

const resultadoPropina = document.querySelector('.resultado__propina');
const resultadoTotal = document.querySelector('.resultado__total');


function escucharInputs() {
    
    inputCustom.addEventListener('input', () => {
        validarCustom();
    })
    
    inputsNumber.forEach( input => {
        input.addEventListener('input', e => {
            const {propinaPorPersona, totalPorPersona} = calculadora();
            escribirResultados(propinaPorPersona, totalPorPersona);
        })
    })

    botones.forEach( boton => {
        boton.addEventListener('click', (e) => {
            botones.forEach(btn => {
                btn.classList.remove('boton-propina--activo');
            })
            boton.classList.add('boton-propina--activo');
            inputCustom.value = '';
            const {propinaPorPersona, totalPorPersona} = calculadora();
            escribirResultados(propinaPorPersona, totalPorPersona);
        })
    })


    botonReset.addEventListener('click', ()=> {
        inputsNumber.forEach(input => {
            input.value = '';
            escribirResultados(0,0)
        })
    })

}

function calculadora() {
    const cuenta = +document.querySelector('.input__propina').value;
    const porcentajePropina = inputCustom.value 
    ? +document.querySelector('.custom').value
    : +document.querySelector('.boton-propina--activo').id;
    const personas = +document.querySelector('.input__personas').value;

    const propina = obtenerPropina(cuenta, porcentajePropina);
    const propinaPorPersona = propina / personas;
    const totalPorPersona = (cuenta + propina) / personas;

    return {propinaPorPersona, totalPorPersona};

}

function escribirResultados(propina, total) {
    if (propina == Infinity || total == Infinity || isNaN(propina) || isNaN(total)) {
        resultadoPropina.textContent = '$0.00'
        resultadoTotal.textContent = '$0.00'
        return
    }

    resultadoPropina.textContent = `$${propina.toFixed(2)}`;
    resultadoTotal.textContent = `$${total.toFixed(2)}`

}

function validarCustom() {
    if(inputCustom.value == '') {
        botones[0].classList.add('boton-propina--activo');
    } else {
        botones.forEach(boton => {
            boton.classList.remove('boton-propina--activo');
        })
    }

}

function obtenerPropina(cantidad, porcentaje) {
    return (cantidad * porcentaje) / 100;
}
