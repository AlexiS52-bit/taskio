const input = document.getElementById('taskInput');
const button = document.getElementById('addTaskBtn');
const list = document.getElementById('taskList');

// Función para guardar tareas en localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    tasks.push(li.firstChild.textContent);
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Función para crear una tarea con botón de eliminar
function createTask(taskText) {
  const li = document.createElement('li');

  // Texto de la tarea
  const span = document.createElement('span');
  span.textContent = taskText;
  li.appendChild(span);

  // Botón de eliminar
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑️';
  deleteBtn.style.marginLeft = '10px';
  deleteBtn.style.cursor = 'pointer';
  deleteBtn.addEventListener('click', () => {
    list.removeChild(li);
    saveTasks();
  });

  li.appendChild(deleteBtn);
  list.appendChild(li);
}

// Agregar tarea nueva
button.addEventListener('click', () => {
  const task = input.value.trim();
  if (task !== '') {
    createTask(task);
    input.value = '';
    saveTasks();
  }
});

// Cargar tareas al iniciar la página
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => createTask(task));
}

loadTasks();