// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements
    const addButton = document.getElementById('add-tak-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Initialize and Load Tasks
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(taskText => {
            createTaskElement(taskText);
        });
    }

    // Create the addTask Function
    function addTask() {
        // Retrieve and trim the value from the task input field
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Task Creation and Removal
        createTaskElement(taskText);

        // Save the new task to Local Storage
        saveTask(taskText);

        // Clear the task input field
        taskInput.value = "";
    }

    // Function to create task element
    function createTaskElement(taskText) {
        // Create a new li element
        const li = document.createElement('li');
        li.textContent = taskText;
        li.classList.add('task-item'); // Add class to li element

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn'); // Add class to remove button

        // Assign an onclick event to the remove button
        removeButton.onclick = function() {
            removeTask(li, taskText);
        };

        // Append the remove button to the li element
        li.appendChild(removeButton);

        // Append the li to taskList
        taskList.appendChild(li);
    }

    // Function to save task to Local Storage
    function saveTask(taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to remove task
    function removeTask(li, taskText) {
        taskList.removeChild(li);

        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Attach Event Listeners
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});