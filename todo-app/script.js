

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

//load from local storage
window.onload = () => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => addTask(task.text, task.completed));
};

function addTask(text, completed = false){
    const li = document.createElement("li");
    li.className = "flex justify-between items-center bg-gray-100 p-2 rounded";

    const span = document.createElement("span");
    span.textContent = text;
    if(completed) span.classList.add("line-through", "text-gray-500");

    //completed toggle
    span.addEventListener("click", () => {
        span.classList.toggle("line-through");
        span.classList.toggle("text-gray-500");
        saveTasks();
    });

    //Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.className = "text-red-500";
    delBtn.onclick = () => {
        li.remove();
        saveTasks();
    };

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
    saveTasks();
}

addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if(text) {
        addTask(text);
        taskInput.value = "";
    }
});

//save task to localstorage

function savedTasks(){
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.querySelector("span").classList.contains("line-through")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}