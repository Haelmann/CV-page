document.addEventListener("DOMContentLoaded", loadedTasks);

const form = document.getElementById("input-form");
const inputField = document.getElementById("input-text");
const taskListTable = document.getElementById("task-table-ul");

//-----------event-listeners-------------------//
form.addEventListener("submit", function(event){
    
    event.preventDefault();
    const textToAdd = inputField.value.trim();

    if (textToAdd === ""){
        alert("empty field!");
        return;
    }

    saveTask(textToAdd);
    addTask(textToAdd, false);
    inputField.value = "";
});

//-----------functions-------------------------//
function addTask(taskText, state = false){
  const li = document.createElement("li");
  li.textContent = taskText;
  if (state) {
    li.classList.add("completed")
  }

  li.addEventListener("click", function(event){
    li.classList.toggle("completed");
    updateTaskState(taskText, li.classList.contains("completed"));
  });


    const delButton = document.createElement("button");
    delButton.textContent = ("✖");
    delButton.classList.add("delBtn");
    delButton.addEventListener("click", function(event){
      event.stopPropagation();
      deleteTask(taskText);
      taskListTable.removeChild(li);
    });

    li.appendChild(delButton);
    taskListTable.appendChild(li);
}

function loadedTasks(){
  const tasks = localStorage.getItem("tasks"); 
  const taskList = tasks ? JSON.parse(tasks) : [];
  taskList.forEach(task => addTask(task.text, task.state));
}

function saveTask(taskText){ 
    const tasks = localStorage.getItem("tasks"); //download data from local storage
    const taskList = tasks ? JSON.parse(tasks) : []; //check for null result, assign empty array if false
    taskList.push({text: taskText, state: false}); //adding new element to the task list
    localStorage.setItem("tasks", JSON.stringify(taskList));//saving updated list to local storage
}

function updateTaskState(taskText, state){
    const tasks = localStorage.getItem("tasks"); //download data from local storage
    const taskList = tasks ? JSON.parse(tasks) : []; //check for null result, assign empty array if false
    for (let i = 0; i < taskList.length; i++){
        if (taskList[i].text === taskText){
            taskList[i].state = state;
            
        }
    }
    localStorage.setItem("tasks", JSON.stringify(taskList));
}

function deleteTask(taskText){
    const tasks = localStorage.getItem("tasks"); //download data from local storage
    const taskList = tasks ? JSON.parse(tasks) : []; //check for null result, assign empty array if false    
    const taskListToSave = taskList.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(taskListToSave));
}

