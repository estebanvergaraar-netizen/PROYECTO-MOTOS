/*
 * Archivo: juego.js
 * Lógica del juego, puntuación y envío de datos.
 * CORREGIDO: Eliminadas las referencias a la imagen ('imagenEscena') para evitar errores de DOM.
 */

// ----------------------------------------------------
// 1. ESTRUCTURA DE DATOS DEL JUEGO (10 Escenarios)
// ----------------------------------------------------

const juegoMotos = { 
    
    "tema1_inicio": {
        titulo: "Escenario 1: Tráfico Pesado",
        texto: "Estás en el carril central de una avenida con tráfico totalmente detenido. Llegas tarde. ¿Qué haces?",
        imagen: "", // <--- ELIMINADA LA REFERENCIA A imagen1.jpg
        opciones: [
            { texto: "A. Comienzas a filtrar (pasar entre carriles) a baja velocidad, atento a las puertas.", puntos: +15, mensajeResultado: "¡Decisión Correcta! El filtrado (lane splitting) a baja velocidad es aceptado en muchas jurisdicciones y reduce el riesgo de colisión por alcance, además de reducir tu exposición al tráfico estático.", },
            { texto: "B. Te subes al arcén (andén) para adelantar rápidamente a todos.", puntos: -10, mensajeResultado: "¡Decisión Incorrecta! Usar el arcén es ilegal, pones en riesgo a peatones y podrías dañar tu moto con escombros.", },
            { texto: "C. Te detienes justo detrás del coche de adelante y esperas.", puntos: -5, mensajeResultado: "Decisión Aceptable, pero Ineficiente. Te mantiene legal, pero te deja vulnerable a ser golpeado por detrás.", }
        ]
    },
    
    "tema2_inicio": {
        titulo: "Escenario 2: Velocidad Máxima",
        texto: "Estás en una recta de 80 km/h y ves una señal de curva cerrada adelante. ¿Qué haces?",
        imagen: "", // <--- ELIMINADA LA REFERENCIA A imagen2.jpg
        opciones: [
            { texto: "A. Mantienes la velocidad hasta el inicio de la curva.", puntos: -15, mensajeResultado: "¡Incorrecto! Debes reducir la velocidad *antes* de entrar en la curva. Freno antes, acelero suavemente durante.", },
            { texto: "B. Frenas gradualmente y reduces la marcha mucho antes de la curva.", puntos: +10, mensajeResultado: "¡Correcto! Frenar de forma progresiva antes de la curva te da estabilidad y control para inclinar la moto.", }
        ]
    },

    "tema3_inicio": {
        titulo: "Escenario 3: Rebase en Carretera",
        texto: "Estás detrás de un camión lento en una carretera de doble sentido. ¿Cuándo es seguro adelantarlo?",
        imagen: "", // <--- ELIMINADA LA REFERENCIA A imagen3.jpg
        opciones: [
            { texto: "A. Cuando ves línea discontinua y tienes suficiente visibilidad para completar la maniobra rápidamente.", puntos: +15, mensajeResultado: "¡Correcto! Solo debes adelantar cuando la línea lo permita y tengas visibilidad total. La rapidez minimiza el tiempo en el carril contrario.", },
            { texto: "B. Te acercas mucho a la defensa del camión y aceleras de inmediato para adelantarlo.", puntos: -10, mensajeResultado: "¡Incorrecto! Seguir muy de cerca ('tailgating') reduce tu visibilidad y te impide reaccionar.", }
        ]
    },

    "tema4_inicio": {
        titulo: "Escenario 4: Equipo para un Viaje Corto",
        texto: "Vas a la tienda de la esquina (5 minutos de trayecto). Hace calor. ¿Qué equipo es esencial?",
        imagen: "", // <--- ELIMINADA LA REFERENCIA A imagen4.jpg
        opciones: [
            { texto: "A. Solo el casco. Los guantes y chaqueta son exagerados para tan poco recorrido.", puntos: -10, mensajeResultado: "¡Incorrecto! La mayoría de los accidentes ocurren cerca de casa. El casco y los guantes son esenciales.", },
            { texto: "B. Casco certificado, guantes, y calzado que cubra el tobillo, sin importar la duración del viaje.", puntos: +15, mensajeResultado: "¡Correcto! Nunca se compromete la seguridad por la distancia. El equipo básico es la única protección contra la abrasión.", }
        ]
    },

    "tema5_inicio": {
        titulo: "Escenario 5: Giro a la Izquierda en Intersección",
        texto: "Estás esperando para girar a la izquierda con tráfico de frente. ¿Cuál es la posición más segura?",
        imagen: "", // <--- ELIMINADA LA REFERENCIA A imagen5.jpg
        opciones: [
            { texto: "A. Ponerte completamente en el centro del carril, con las ruedas rectas, esperando una oportunidad.", puntos: +15, mensajeResultado: "¡Correcto! Posicionarte en el centro te hace visible. Mantener las ruedas rectas previene que seas empujado al tráfico si te golpean por detrás.", },
            { texto: "B. Girar las ruedas ligeramente hacia la izquierda y quedarte al lado izquierdo del carril.", puntos: -10, mensajeResultado: "¡Incorrecto! Si te golpean por detrás, las ruedas giradas te proyectarán directamente al carril contrario.", }
        ]
    },

    "tema6_inicio": {
        titulo: "Escenario 6: Conducción Bajo Lluvia",
        texto: "Comienza a llover fuertemente en la autopista. ¿Cómo ajustas tu conducción?",
        imagen: "", // <--- ELIMINADA LA REFERENCIA A imagen6.jpg
        opciones: [
            { texto: "A. Mantienes la velocidad pero duplicas la distancia de seguimiento.", puntos: -5, mensajeResultado: "Aceptable, pero insuficiente. La distancia debe aumentar. Además, la velocidad debe reducirse drásticamente para evitar el aquaplaning.", },
            { texto: "B. Reduces la velocidad, triplicas la distancia de seguimiento y evitas líneas blancas y tapas de alcantarilla.", puntos: +15, mensajeResultado: "¡Correcto! Superficies pintadas y metálicas son extremadamente resbaladizas con lluvia. Reducir la velocidad y aumentar la distancia son vitales.", }
        ]
    },

    "tema7_inicio": {
        titulo: "Escenario 7: Frenado de Emergencia (Sin ABS)",
        texto: "Un coche te corta el paso de repente y necesitas frenar al máximo. ¿Qué haces en tu moto sin ABS?",
        imagen: "", // <--- ELIMINADA LA REFERENCIA A imagen7.jpg
        opciones: [
            { texto: "A. Aplicas el 70% de la fuerza en el freno delantero y el 30% en el trasero, sin bloquear la rueda.", puntos: +15, mensajeResultado: "¡Correcto! El freno delantero proporciona la mayor potencia de frenado. La clave es aplicar fuerza progresivamente para no bloquear la rueda y perder el control.", },
            { texto: "B. Solo usas el freno trasero para evitar una caída, ya que el delantero es peligroso.", puntos: -10, mensajeResultado: "¡Incorrecto! El freno trasero solo proporciona una fracción de la potencia. Confiar solo en él aumenta dramáticamente la distancia de frenado.", }
        ]
    },

    "tema8_inicio": {
        titulo: "Escenario 8: Chequeo Pre-Viaje",
        texto: "Vas a hacer un viaje largo. ¿Cuál es el chequeo más crítico que debes hacer justo antes de salir?",
        imagen: "", // <--- ELIMINADA LA REFERENCIA A imagen8.jpg
        opciones: [
            { texto: "A. Revisar la presión de los neumáticos y verificar que las luces de freno y direccionales funcionen.", puntos: +15, mensajeResultado: "¡Correcto! Los neumáticos con presión incorrecta afectan la estabilidad y el agarre. Luces funcionales son cruciales para ser visto por otros conductores.", },
            { texto: "B. Asegurarte de que el tanque esté lleno y que el asiento esté cómodo.", puntos: -5, mensajeResultado: "Importante para el viaje, pero irrelevante para la seguridad.", }
        ]
    },

    "tema9_inicio": {
        titulo: "Escenario 9: Seguridad Nocturna",
        texto: "Estás conduciendo de noche en una zona rural sin iluminación. ¿Qué ajustas?",
        imagen: "", // <--- ELIMINADA LA REFERENCIA A imagen9.jpg
        opciones: [
            { texto: "A. Uso las luces altas constantemente y mantengo mi velocidad normal, confiando en las luces.", puntos: -10, mensajeResultado: "¡Incorrecto! Las luces altas deben bajarse inmediatamente al ver tráfico de frente. Además, debes reducir la velocidad para extender tu tiempo de reacción.", },
            { texto: "B. Reduzco la velocidad, aumento la distancia de seguimiento y uso las luces adecuadas (bajas al cruzarse con vehículos).", puntos: +15, mensajeResultado: "¡Correcto! Conducir de noche reduce drásticamente la visibilidad; reducir la velocidad es vital.", }
        ]
    },

    "tema10_inicio": {
        titulo: "Escenario 10: Conducir con un Pasajero",
        texto: "Llevas a un pasajero por primera vez. ¿Cuál es la instrucción más importante que debes darle ANTES de arrancar?",
        imagen: "", // <--- ELIMINADA LA REFERENCIA A imagen10.jpg
        opciones: [
            { texto: "A. Decirle que se incline contigo en las curvas y que no se mueva sin avisar.", puntos: +15, mensajeResultado: "¡Correcto! El pasajero debe actuar como una extensión del conductor, inclinándose en la misma dirección para mantener el equilibrio.", },
            { texto: "B. Indicarle que se siente muy atrás y que se agarre de tus hombros.", puntos: -5, mensajeResultado: "¡Incorrecto! El pasajero debe sentarse lo más cerca posible de ti y agarrarse de las asas de la moto (o de tu cintura).", }
        ]
    }
};

const secuenciaTemas = [
    "tema1_inicio", 
    "tema2_inicio",
    "tema3_inicio",
    "tema4_inicio",
    "tema5_inicio",
    "tema6_inicio",
    "tema7_inicio",
    "tema8_inicio",
    "tema9_inicio",
    "tema10_inicio" 
]; 

// ----------------------------------------------------
// 2. VARIABLES GLOBALES Y ALMACENAMIENTO DE DATOS
// ----------------------------------------------------
let puntuacionTotal = 0;
let indiceEscenarioActual = 0;
const respuestasUsuario = {}; 

// 🚀 URL DE REGISTRO DE DATOS: INSERTADA DESDE GOOGLE APPS SCRIPT
// ¡IMPORTANTE! Asegúrate de que esta URL NO tenga espacios para que funcione.
const urlAppsScript = "https://script.google.com/macros/s/AKfycbyoQWTKR6BXTsbwVfaWHxWgt80wu4nbkVWDMHTOpwSiccbXUNIXITrArEd6edKSN2A/exec"; 


// Referencias del DOM 
// *** CORRECCIÓN: 'imagenEscena' se mantiene en el 'let' de variables, pero ya no se asignará un valor que cause error ***
// Se permite que la variable exista, pero su uso es lo que se eliminará.
let textoNarrativa, imagenEscena, opcionesContenedor, tituloEscena, puntuacionDisplay, contadorEscenario, feedbackResultado, mensajeResultado, botonSiguiente;
let resultadosProyecto, botonReiniciar, botonVerGrafica; 
let pantallaInicio, contenidoPrincipal, botonIniciarJuego; 


// ----------------------------------------------------
// 3. FUNCIONES DE LÓGICA DEL JUEGO
// ----------------------------------------------------

function actualizarPuntuacion(puntos) {
    puntuacionTotal += puntos;
    puntuacionDisplay.textContent = puntuacionTotal;
    
    const contenedorPuntos = document.getElementById('puntuacion-display');
    if (puntos > 0) {
        contenedorPuntos.classList.add('animacion-ganar');
    } else if (puntos < 0) {
        contenedorPuntos.classList.add('animacion-perder');
    }
    
    setTimeout(() => {
        contenedorPuntos.classList.remove('animacion-ganar', 'animacion-perder');
    }, 500);
}

function iniciarEscenario(nodoID) {
    const escena = juegoMotos[nodoID];

    feedbackResultado.classList.add('oculto');
    botonSiguiente.classList.add('oculto');
    opcionesContenedor.style.display = 'flex'; 
    resultadosProyecto.classList.add('oculto'); 

    contadorEscenario.textContent = `Escenario ${indiceEscenarioActual + 1} de ${secuenciaTemas.length}`;
    tituloEscena.textContent = escena.titulo;
    textoNarrativa.textContent = escena.texto;
    
    // *** CORRECCIÓN CLAVE 1: ESTA LÍNEA DE ASIGNACIÓN CAUSA EL ERROR Y DEBE ELIMINARSE O COMENTARSE ***
    // imagenEscena.src = `/Proyecto-Motos-Seguridad/img/${escena.imagen}`; 

    opcionesContenedor.innerHTML = '';

    escena.opciones.forEach((opcion, index) => {
        const boton = document.createElement('button');
        boton.textContent = opcion.texto;
        
        boton.addEventListener('click', () => {
            const idEscenario = secuenciaTemas[indiceEscenarioActual];
            // Guarda la respuesta como A, B o C
            respuestasUsuario[idEscenario] = String.fromCharCode(65 + index); 
            
            manejarDecision(opcion);
        });

        opcionesContenedor.appendChild(boton);
    });
}

function manejarDecision(opcionElegida) {
    opcionesContenedor.style.display = 'none';

    actualizarPuntuacion(opcionElegida.puntos);

    mensajeResultado.textContent = opcionElegida.mensajeResultado;
    feedbackResultado.classList.remove('oculto');
    
    if (opcionElegida.puntos > 0) {
        feedbackResultado.classList.add('acierto');
        feedbackResultado.classList.remove('error');
    } else {
        feedbackResultado.classList.add('error');
        feedbackResultado.classList.remove('acierto');
    }
    
    botonSiguiente.classList.remove('oculto');
}

function avanzarEscenario() {
    indiceEscenarioActual++;
    
    if (indiceEscenarioActual < secuenciaTemas.length) {
        const siguienteNodo = secuenciaTemas[indiceEscenarioActual];
        iniciarEscenario(siguienteNodo);
    } else {
        mostrarResultadoFinal();
    }
}


// ----------------------------------------------------
// 4. FUNCIONES PARA RECOLECCIÓN DE DATOS (APPS SCRIPT)
// ----------------------------------------------------

function enviarResultadosAlServidor() {
    // Preparar los datos en el formato que Google Apps Script espera
    const datosParaEnviar = {
        puntuacion: puntuacionTotal,
        fecha: new Date().toISOString(),

        // Mapear las respuestas del juego a las columnas de tu Hoja de Cálculo
        respuesta_tema1: respuestasUsuario["tema1_inicio"] || 'N/A',
        respuesta_tema2: respuestasUsuario["tema2_inicio"] || 'N/A',
        respuesta_tema3: respuestasUsuario["tema3_inicio"] || 'N/A',
        respuesta_tema4: respuestasUsuario["tema4_inicio"] || 'N/A',
        respuesta_tema5: respuestasUsuario["tema5_inicio"] || 'N/A',
        respuesta_tema6: respuestasUsuario["tema6_inicio"] || 'N/A',
        respuesta_tema7: respuestasUsuario["tema7_inicio"] || 'N/A',
        respuesta_tema8: respuestasUsuario["tema8_inicio"] || 'N/A',
        respuesta_tema9: respuestasUsuario["tema9_inicio"] || 'N/A',
        respuesta_tema10: respuestasUsuario["tema10_inicio"] || 'N/A',
    };

    fetch(urlAppsScript, {
        method: 'POST',
        headers: {
            // No necesitamos Content-Type: application/json con Apps Script
        },
        body: JSON.stringify(datosParaEnviar)
    })
    .then(response => {
        if (!response.ok) {
            console.error('Error al enviar datos:', response.statusText);
        } else {
            console.log("¡Resultados enviados con éxito a Google Sheets vía Apps Script!");
        }
    })
    .catch(error => {
        console.error('Error de red al enviar datos:', error);
    });
}


function mostrarResultadoFinal() {
    // Oculta el juego principal y el feedback
    contenidoPrincipal.classList.add('oculto'); 
    feedbackResultado.classList.add('oculto');
    
    // Envía los datos al servidor antes de mostrar la pantalla final
    enviarResultadosAlServidor(); 

    // Actualiza el texto de la pantalla final
    tituloEscena.textContent = "¡Proyecto Finalizado!";
    textoNarrativa.textContent = `Tu juego ha terminado. Tu puntuación final es: ${puntuacionTotal} puntos. ¡Has tomado decisiones clave para la seguridad vial!`;
    
    // Muestra la sección de resultados (en lugar de la gráfica simulada)
    resultadosProyecto.classList.remove('oculto');
}


// ----------------------------------------------------
// 5. INICIO DEL JUEGO
// ----------------------------------------------------

window.onload = function() {
    // 1. Inicializar las referencias al DOM:
    textoNarrativa = document.getElementById('texto-narrativa');
    // *** CORRECCIÓN CLAVE 2: ESTA LÍNEA ES LA QUE CAUSABA 'null' y el fallo. Se comenta/elimina. ***
    // imagenEscena = document.getElementById('imagen-escena');
    opcionesContenedor = document.getElementById('opciones-contenedor');
    tituloEscena = document.getElementById('titulo-escena');
    puntuacionDisplay = document.getElementById('puntuacion-actual');
    contadorEscenario = document.getElementById('contador-escenario');
    feedbackResultado = document.getElementById('feedback-resultado');
    mensajeResultado = document.getElementById('mensaje-resultado');
    botonSiguiente = document.getElementById('boton-siguiente');
    
    // Referencias de la Pantalla de Inicio y Contenido Principal
    pantallaInicio = document.getElementById('pantalla-inicio');
    contenidoPrincipal = document.getElementById('contenido-principal');
    botonIniciarJuego = document.getElementById('boton-iniciar-juego');
    
    resultadosProyecto = document.getElementById('resultados-proyecto');
    botonReiniciar = document.getElementById('boton-reiniciar');
    botonVerGrafica = document.getElementById('boton-ver-grafica');


    // 2. Lógica de INICIO DEL JUEGO (Al hacer clic en el botón)
    botonIniciarJuego.addEventListener('click', () => {
        // Oculta la pantalla de inicio
        pantallaInicio.classList.add('oculto');
        
        // Muestra el contenido principal del juego
        contenidoPrincipal.classList.remove('oculto');

        // INICIA el primer escenario
        iniciarEscenario(secuenciaTemas[indiceEscenarioActual]);
    });
    
    // 3. Añadir listeners generales
    botonSiguiente.addEventListener('click', avanzarEscenario);
    botonReiniciar.addEventListener('click', () => location.reload()); // Reinicia la página
    
    // Listener para el nuevo botón de gráfica (redirige a la página de resultados)
    botonVerGrafica.addEventListener('click', () => {
        window.location.href = 'resultados.html';
    });
}
