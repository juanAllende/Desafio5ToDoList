const tareas = [
    { id: 1, descripcion: 'Estudiar JavaScript', completado: false },
    { id: 2, descripcion: 'Hacer ejercicio', completado: false },
    { id: 3, descripcion: 'Leer un libro', completado: false }
];

function renderizarTareas() {
    const listaTareas = document.getElementById('lista-tareas');
    const resumenTareas = document.getElementById('resumen-tareas');
    listaTareas.innerHTML = '';
    resumenTareas.innerHTML = '';

    tareas.forEach(tarea => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
            <span>${tarea.descripcion}</span>
            <div>
                <button class="btn btn-success" onclick="completarTarea(${tarea.id})">${tarea.completado ? 'Desmarcar' : 'Completar'}</button>
                <button class="btn btn-danger" onclick="eliminarTarea(${tarea.id})">Eliminar</button>
            </div>
        `;
        listaTareas.appendChild(li);

        const resumenLi = document.createElement('li');
        resumenLi.className = 'list-group-item';
        resumenLi.textContent = tarea.descripcion;
        resumenTareas.appendChild(resumenLi);
    });

    actualizarContadores();
}

function actualizarContadores() {
    const totalTareas = tareas.length;
    const tareasRealizadas = tareas.filter(tarea => tarea.completado).length;
    document.getElementById('total-tareas').textContent = totalTareas;
    document.getElementById('tareas-realizadas').textContent = tareasRealizadas;
}

function agregarTarea() {
    const nuevaTareaInput = document.getElementById('nueva-tarea');
    const descripcion = nuevaTareaInput.value.trim();
    if (descripcion) {
        const nuevaTarea = {
            id: Date.now(),
            descripcion,
            completado: false
        };
        tareas.push(nuevaTarea);
        nuevaTareaInput.value = '';
        renderizarTareas();
    }
}

function eliminarTarea(id) {
    const indice = tareas.findIndex(tarea => tarea.id === id);
    if (indice !== -1) {
        tareas.splice(indice, 1);
        renderizarTareas();
    }
}

function completarTarea(id) {
    const tarea = tareas.find(tarea => tarea.id === id);
    if (tarea) {
        tarea.completado = !tarea.completado;
        renderizarTareas();
    }
}

document.getElementById('agregar-tarea').addEventListener('click', agregarTarea);
document.getElementById('nueva-tarea').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        agregarTarea();
    }
});

document.addEventListener('DOMContentLoaded', renderizarTareas);
