const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const loadTasks = () => {
  taskList.innerHTML = ""; 
  tasks.forEach((task) => {
    createTask(task.id, task.name, task.completed);
  });
};

const createTask = (id, taskContent, completed) => {
  const li = document.createElement("li");
  li.classList.add("task");
  if (completed) li.classList.add("completed");

  const taskText = document.createElement("span");
  taskText.textContent = taskContent;
  taskText.addEventListener("click", () => toggleCompletion(id));

  const editButton = document.createElement("button");
  editButton.classList.add("editButton");
  editButton.textContent = "Edit";
  editButton.addEventListener("click", () => editTask(id));

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("deleteButton");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteTask(id));

  li.appendChild(taskText);
  li.appendChild(editButton);
  li.appendChild(deleteButton);
  taskList.appendChild(li);
};

const addTask = () => {
  const taskContent = taskInput.value.trim();
  if (taskContent === "") {
    alert("Please enter a task!");
    return;
  }

  const newTask = {
    id: Date.now(),
    name: taskContent,
    completed: false,
  };

  tasks.push(newTask);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskInput.value = ""; 
  loadTasks();
};

const toggleCompletion = (taskId) => {
  const task = tasks.find((task) => task.id === taskId);
  task.completed = !task.completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
};

const deleteTask = (taskId) => {
  tasks = tasks.filter((task) => task.id !== taskId);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
};

const editTask = (taskId) => {
  const task = tasks.find((task) => task.id === taskId);
  const newTaskContent = prompt("Edit your task:", task.name);
  if (newTaskContent !== null && newTaskContent.trim() !== "") {
    task.name = newTaskContent.trim();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
  }
};

addTaskButton.addEventListener("click", addTask);

// Load tasks on page load
window.onload = loadTasks;
