/*
window.addEventListener('DOMContentLoaded', () => {
    
    const dishInput = document.getElementById('dishInput');
    const addDishButton = document.getElementById('addDishButton');
    const menuList = document.getElementById('menuList');

    
    function loadMenu() {
    const menu = JSON.parse(localStorage.getItem('menu')) || [];
    menuList.innerHTML = '';
    menu.forEach((dish, index) => renderDish(dish, index));
    }

    
    function saveMenu(menu) {
    localStorage.setItem('menu', JSON.stringify(menu));
    }

    
    function renderDish(dish, index) {
    const li = document.createElement('li');
    li.className = dish.available ? 'available' : 'unavailable';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = dish.available;
    checkbox.addEventListener('change', () => toggleDishAvailability(index));

    const span = document.createElement('span');
    span.textContent = dish.name;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.addEventListener('click', () => deleteDish(index));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);
    menuList.appendChild(li);
    }

    
    function addDish() {
    const dishName = dishInput.value.trim();
    if (dishName === '') {
        alert('Por favor, ingresa un plato.');
        return;
    }

    const menu = JSON.parse(localStorage.getItem('menu')) || [];
    menu.push({ name: dishName, available: true });
    saveMenu(menu);
    renderDish({ name: dishName, available: true }, menu.length - 1);
    dishInput.value = '';
    }

    
    function toggleDishAvailability(index) {
    const menu = JSON.parse(localStorage.getItem('menu')) || [];
    menu[index].available = !menu[index].available;
    saveMenu(menu);
    loadMenu();
    }

    
    function deleteDish(index) {
    const menu = JSON.parse(localStorage.getItem('menu')) || [];
    menu.splice(index, 1);
    saveMenu(menu);
    loadMenu();
    }

    
    addDishButton.addEventListener('click', addDish);
    loadMenu(); 
});
*/

document.addEventListener("DOMContentLoaded", () => {
    const dishInput = document.getElementById("dishInput");
    const addDishButton = document.getElementById("addDishButton");
    const menuList = document.getElementById("menuList");

    addDishButton.addEventListener("click", addDish);
    
    // Cargar el menú al iniciar
    loadMenu();
});

// 🟢 Función para cargar el menú desde localStorage o una API
function loadMenu() {
    const menu = JSON.parse(localStorage.getItem("menu")) || [];
    renderMenu(menu);
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
        mostrarMensaje("Por favor, ingresa un plato.");
        return;
    }

    const menu = JSON.parse(localStorage.getItem("menu")) || [];
    const newDish = { name: dishName, available: true };

    menu.push(newDish);
    saveMenu(menu);
    renderMenu(menu);
    dishInput.value = "";

    // Simulación de API para guardar el plato
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDish)
    })
    .then(response => response.json())
    .then(data => mostrarMensaje(`Plato "${dishName}" agregado con éxito. ID: ${data.id}`))
    .catch(() => mostrarMensaje("Error al agregar el plato."));
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

    // Simulación de API para eliminar un plato
    fetch("https://jsonplaceholder.typicode.com/posts/1", { method: "DELETE" })
    .then(() => mostrarMensaje(`Plato "${deletedDish}" eliminado con éxito.`))
    .catch(() => mostrarMensaje("Error al eliminar el plato."));
}

// 🟢 Función para mostrar mensajes en la UI
function mostrarMensaje(mensaje) {
    console.log(mensaje); // Se puede cambiar por una notificación en la UI si es necesario
}
