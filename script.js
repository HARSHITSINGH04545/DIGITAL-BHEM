// Get elements
const taskInput = document.querySelector("#taskInput");
const addTaskBtn = document.querySelector("#addTaskBtn");
const pendingTasks = document.querySelector('#pendingTasks');
const completedTasks = document.querySelector("#completedTasks");

let tasks = [];

//add task section....
addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const newTask = {
        id: Date.now(),
        text: taskText,
        isComplete: false,
        createdAt: new Date().toLocaleString(),
        completedAt: null
    };

    tasks.push(newTask);
    renderTasks();
    taskInput.value = '';
});

// editb task list
function editTask(id) {
    const task = tasks.find(t => t.id === id);
    const newText = prompt('Edit Task:', task.text);
    if (newText && newText.trim() !== '') {
        task.text = newText.trim();
        renderTasks();
    }
}

// delete task...
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    renderTasks();
}

//marks tasks as complete....
function markComplete(id) {
    const task = tasks.find(t => t.id === id);
    task.isComplete = true;
    task.completedAt = new Date().toLocaleString();
    renderTasks();
}

// render tasks in the display...
function renderTasks() {
    pendingTasks.innerHTML = '';
    completedTasks.innerHTML = '';

    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            ${task.text} <small>(Created at: ${task.createdAt})</small>
        `;

        if (!task.isComplete) {
            //pending tasks buttons
            const editBtn = document.createElement('button');
            editBtn.className = 'edit-btn';
            editBtn.innerText = 'Edit';
            editBtn.onclick = () => editTask(task.id);

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.innerText = 'Delete';
            deleteBtn.onclick = () => deleteTask(task.id);

            const completeBtn = document.createElement('button');
            completeBtn.className = 'complete-btn';
            completeBtn.innerText = 'Complete';
            completeBtn.onclick = () => markComplete(task.id);

            taskItem.append(editBtn, deleteBtn, completeBtn);
            pendingTasks.appendChild(taskItem);
        } else {
            //  timestamp like created at or done on...
            taskItem.innerHTML += `<small>(Completed at: ${task.completedAt})</small>`;
            completedTasks.appendChild(taskItem);
        }
    });
}
