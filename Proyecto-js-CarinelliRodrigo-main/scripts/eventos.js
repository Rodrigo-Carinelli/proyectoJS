
document.addEventListener("DOMContentLoaded", () => {
    const dishInput = document.getElementById("dishInput");
    const addDishButton = document.getElementById("addDishButton");
    const menuList = document.getElementById("menuList");

    addDishButton.addEventListener("click", addDish);
    
    // Cargar el menú al iniciar
    loadMenu();
});

// 🟢 Función para cargar el menú desde `menu.json`
function loadMenu() {
    fetch("menu.json")
        .then(response => response.json())
        .then(data => {
            saveMenu(data); // Guarda en localStorage
            renderMenu(data);
        })
        .catch(() => mostrarMensaje("Error al cargar el menú", "error"));
}

// 🟢 Función para guardar el menú en localStorage
function saveMenu(menu) {
    localStorage.setItem("menu", JSON.stringify(menu));
}

// 🟢 Función para mostrar los platos en la UI
function renderMenu(menu) {
    const menuList = document.getElementById("menuList");
    menuList.innerHTML = "";

    menu.forEach((dish, index) => {
        const li = document.createElement("li");
        li.className = dish.available ? "available" : "unavailable";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = dish.available;
        checkbox.addEventListener("change", () => toggleDishAvailability(index));

        const span = document.createElement("span");
        span.textContent = dish.name;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.addEventListener("click", () => deleteDish(index));

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);
        menuList.appendChild(li);
    });
}

// 🟢 Función para agregar un nuevo plato
function addDish() {
    const dishInput = document.getElementById("dishInput");
    const dishName = dishInput.value.trim();

    if (dishName === "") {
        mostrarMensaje("Por favor, ingresa un plato.", "error");
        return;
    }

    const menu = JSON.parse(localStorage.getItem("menu")) || [];
    const newDish = { name: dishName, available: true };

    menu.push(newDish);
    saveMenu(menu);
    renderMenu(menu);
    dishInput.value = "";

    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDish)
    })
    .then(response => response.json())
    .then(data => mostrarMensaje(`Plato "${dishName}" agregado con éxito. ID: ${data.id}`, "success"))
    .catch(() => mostrarMensaje("Error al agregar el plato.", "error"));
}

// 🟢 Función para cambiar la disponibilidad de un plato
function toggleDishAvailability(index) {
    const menu = JSON.parse(localStorage.getItem("menu")) || [];
    menu[index].available = !menu[index].available;
    saveMenu(menu);
    renderMenu(menu);
}

// 🟢 Función para eliminar un plato del menú
function deleteDish(index) {
    const menu = JSON.parse(localStorage.getItem("menu")) || [];
    const deletedDish = menu[index].name;
    menu.splice(index, 1);
    saveMenu(menu);
    renderMenu(menu);

    fetch("https://jsonplaceholder.typicode.com/posts/1", { method: "DELETE" })
    .then(() => mostrarMensaje(`Plato "${deletedDish}" eliminado con éxito.`, "success"))
    .catch(() => mostrarMensaje("Error al eliminar el plato.", "error"));
}

// 🟢 Función para mostrar mensajes en la UI con SweetAlert2
function mostrarMensaje(mensaje, tipo = "success") {
    Swal.fire({
        title: tipo === "error" ? "Error" : "Éxito",
        text: mensaje,
        icon: tipo
    });
}

