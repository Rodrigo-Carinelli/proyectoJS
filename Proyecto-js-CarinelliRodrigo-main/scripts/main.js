
/*
nickName = prompt ("Dime cual es tu nombre")


const btnReservar = document.getElementById('btnReservar');
const resumenDiv = document.getElementById('resumen');
const detalleReserva = document.getElementById('detalleReserva');


btnReservar.addEventListener('click', () => {
    const nombre = document.getElementById('nombre')?.value || "";
    const email = document.getElementById('email')?.value || "";
    const telefono = document.getElementById('telefono')?.value || "";
    const fecha = document.getElementById('fecha')?.value || "";
    const hora = document.getElementById('hora')?.value || "";
    const personas = parseInt(document.getElementById('personas')?.value || "0", 10);

    
    if (!nombre || !email || !telefono || !fecha || !hora || isNaN(personas) || personas < 1) {
        alert('Por favor, completa todos los campos correctamente.');
        return;
    }

    if (personas > 10) {
        alert('¡Nota! Para reservas de más de 10 personas, nos pondremos en contacto contigo.');
    }

    let resumen = `Nombre: ${nombre}\nCorreo: ${email}\nTeléfono: ${telefono}\nFecha: ${fecha}\nHora: ${hora}\nNúmero de personas: ${personas}\n\n`;
    resumen += 'Revisión de detalles:\n';

    for (let i = 1; i <= personas; i++) {
        resumen += `Persona ${i}: Lista\n`;
    }

    detalleReserva.innerText = resumen;
    resumenDiv.style.display = 'block';
});


function calcularPresupuesto() {
    const ingreso = parseFloat(document.getElementById('ingreso').value);
    const gastos = parseFloat(document.getElementById('gastos').value);
    const ahorro = parseFloat(document.getElementById('ahorro').value);

    if (isNaN(ingreso) || isNaN(gastos) || isNaN(ahorro) || ingreso <= 0 || gastos < 0 || ahorro < 0 || ahorro > 100) {
        alert('Por favor, ingrese valores válidos.');
        return;
    }

    const ahorroDeseado = (ingreso * ahorro) / 100;
    const saldoDisponible = ingreso - gastos - ahorroDeseado;

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.style.display = 'block';

    if (saldoDisponible >= 0) {
        resultadoDiv.innerHTML = `
            <p><strong>Resultados:</strong></p>
            <p>Ahorro Deseado: $${ahorroDeseado.toFixed(2)}</p>
            <p>Saldo Disponible después de Ahorro y Gastos: $${saldoDisponible.toFixed(2)}</p>
        `;
    } else {
        resultadoDiv.innerHTML = `
            <p><strong>Resultados:</strong></p>
            <p>Ahorro Deseado: $${ahorroDeseado.toFixed(2)}</p>
            <p style="color: red;">No es posible cubrir los gastos y el ahorro deseado. Falta $${Math.abs(saldoDisponible).toFixed(2)}</p>
        `;
    }
}

function calcularROI() {
    const ganancias = parseFloat(document.getElementById('ganancias').value);
    const inversion = parseFloat(document.getElementById('inversion').value);

    if (isNaN(ganancias) || isNaN(inversion) || inversion <= 0) {
        alert('Por favor, ingrese valores válidos.');
        return;
    }

    const roi = ((ganancias - inversion) / inversion) * 100;

    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.style.display = 'block';

    resultadoDiv.innerHTML = `
        <p><strong>Resultados:</strong></p>
        <p>Retorno de Inversión (ROI): <strong>${roi.toFixed(2)}%</strong></p>
    `;

    if (roi < 0) {
        resultadoDiv.innerHTML += `<p class="error">El ROI es negativo. La inversión no fue rentable.</p>`;
    }
}

*/

// Eliminado el prompt para evitar interrupciones en la experiencia del usuario

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btnReservar")?.addEventListener("click", procesarReserva);
    document.getElementById("presupuestoForm")?.addEventListener("submit", (event) => {
        event.preventDefault();
        calcularPresupuesto();
    });
    document.getElementById("roiForm")?.addEventListener("submit", (event) => {
        event.preventDefault();
        calcularROI();
    });
});

// 🟢 Función para procesar la reserva
function procesarReserva() {
    const nombre = document.getElementById("nombre")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const telefono = document.getElementById("telefono")?.value.trim();
    const fecha = document.getElementById("fecha")?.value;
    const hora = document.getElementById("hora")?.value;
    const personas = parseInt(document.getElementById("personas")?.value || "0", 10);

    if (!nombre || !email || !telefono || !fecha || !hora || isNaN(personas) || personas < 1) {
        mostrarMensaje("Por favor, completa todos los campos correctamente.");
        return;
    }

    let resumen = `Nombre: ${nombre}<br>Correo: ${email}<br>Teléfono: ${telefono}<br>Fecha: ${fecha}<br>Hora: ${hora}<br>Número de personas: ${personas}<br><br>`;
    resumen += `<strong>Revisión de detalles:</strong><br>`;

    for (let i = 1; i <= personas; i++) {
        resumen += `Persona ${i}: Lista<br>`;
    }

    document.getElementById("detalleReserva").innerHTML = resumen;
    document.getElementById("resumen").style.display = "block";

    // Simulación de API con fetch para guardar la reserva
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, telefono, fecha, hora, personas })
    })
    .then(response => response.json())
    .then(data => mostrarMensaje(`Reserva guardada con éxito. ID: ${data.id}`))
    .catch(error => mostrarMensaje("Error al guardar la reserva."));
}

// 🟢 Función para calcular el presupuesto
function calcularPresupuesto() {
    const ingreso = parseFloat(document.getElementById("ingreso")?.value);
    const gastos = parseFloat(document.getElementById("gastos")?.value);
    const ahorro = parseFloat(document.getElementById("ahorro")?.value);

    if (isNaN(ingreso) || isNaN(gastos) || isNaN(ahorro) || ingreso <= 0 || gastos < 0 || ahorro < 0 || ahorro > 100) {
        mostrarMensaje("Por favor, ingrese valores válidos.");
        return;
    }

    const ahorroDeseado = (ingreso * ahorro) / 100;
    const saldoDisponible = ingreso - gastos - ahorroDeseado;

    let resultadoHTML = `
        <p><strong>Resultados:</strong></p>
        <p>Ahorro Deseado: $${ahorroDeseado.toFixed(2)}</p>
        <p>Saldo Disponible después de Ahorro y Gastos: $${saldoDisponible.toFixed(2)}</p>
    `;

    if (saldoDisponible < 0) {
        resultadoHTML += `<p style="color: red;">No es posible cubrir los gastos y el ahorro deseado. Falta $${Math.abs(saldoDisponible).toFixed(2)}</p>`;
    }

    mostrarResultado(resultadoHTML);
}

// 🟢 Función para calcular el ROI
async function calcularROI() {
    const ganancias = parseFloat(document.getElementById("ganancias")?.value);
    const inversion = parseFloat(document.getElementById("inversion")?.value);

    if (isNaN(ganancias) || isNaN(inversion) || inversion <= 0) {
        mostrarMensaje("Por favor, ingrese valores válidos.");
        return;
    }

    const roi = ((ganancias - inversion) / inversion) * 100;

    let resultadoHTML = `
        <p><strong>Resultados:</strong></p>
        <p>Retorno de Inversión (ROI): <strong>${roi.toFixed(2)}%</strong></p>
    `;

    if (roi < 0) {
        resultadoHTML += `<p style="color: red;">El ROI es negativo. La inversión no fue rentable.</p>`;
    }

    mostrarResultado(resultadoHTML);

    // Simulación de API para guardar el cálculo
    try {
        let response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ganancias, inversion, roi })
        });

        let data = await response.json();
        mostrarMensaje(`ROI registrado con éxito. ID: ${data.id}`);
    } catch (error) {
        mostrarMensaje("Error al guardar el ROI.");
    }
}

// 🟢 Función para mostrar mensajes
function mostrarMensaje(mensaje) {
    const mensajeDiv = document.getElementById("resultado");
    if (mensajeDiv) {
        mensajeDiv.innerHTML = mensaje;
        mensajeDiv.style.display = "block";
    }
}

// 🟢 Función para mostrar resultados en la UI
function mostrarResultado(resultado) {
    const resultadoDiv = document.getElementById("resultado");
    if (resultadoDiv) {
        resultadoDiv.innerHTML = resultado;
        resultadoDiv.style.display = "block";
    }
}

