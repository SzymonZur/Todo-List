let $themeBtn
let $todoInput
let $todoList
let $newTask
let $clearBtn
let $changeSpace
let $allBtn
let $activeBtn
let $completedBtn

// wrzucamy nasze 2 funkcje do głównej
const main = () => {
    prepareDOMElements();
    prepareDOMEvents();
}

// pobieramy nasze elementy
const prepareDOMElements = () => {
    $themeBtn = document.querySelector(".changeTheme");
    $todoInput = document.querySelector(".todo-input");
    $todoList = document.querySelector(".todo-list");
    $clearBtn = document.querySelector(".clear");
    $changeSpace = document.querySelector(".changeSpace");
    $allBtn = document.querySelector(".all-btn")
    $activeBtn = document.querySelector(".active-btn")
    $completedBtn = document.querySelector(".completed-btn")
};

// nadajemy nasłuchiwanie 
const prepareDOMEvents = () => {
    $themeBtn.addEventListener('click', changeTheme);
    window.addEventListener('keyup', addNewTask);
    $todoList.addEventListener('click', ifCompleted);
    $todoList.addEventListener('click', deleteTask);
    $todoList.addEventListener('click', itemCount)
    $clearBtn.addEventListener('click', clearComplete);
    $allBtn.addEventListener('click', showAllTodo);
    $activeBtn.addEventListener('click', showActiveTodo);
    $completedBtn.addEventListener('click', showCompletedTodo);
};


// ZMIANA TŁA (LIGHT/DARK)
const changeTheme = () => {
    const bodyChange = document.querySelector("body");
    const liChange = document.querySelectorAll("li");
    const btnChange = document.querySelectorAll("button");
    const spaceChange = document.querySelectorAll(".todo-space");
    const inputChange = document.querySelector(".todo-input");
    const changeImg = document.querySelector("header div");

    if($themeBtn.firstElementChild.style.display !== "none"){
        $themeBtn.firstElementChild.style.display = "none"
        $themeBtn.lastElementChild.style.display = "flex"
        changeImg.classList.add("img-hero-dark")
        changeImg.classList.remove("img-hero")
        liChange.forEach(item => {
            item.classList.add("dark-todo")
            item.classList.add("dark-border")
            item.classList.remove("light-todo")
        });
        btnChange.forEach(item => {
            item.classList.add("dark-todo-button")
            item.classList.remove("light-todo-button")
        });
        spaceChange.forEach(item => {
            item.classList.add("dark-todo");
            item.classList.remove("light-todo")
        })
    }else{
        $themeBtn.firstElementChild.style.display = "flex"
        $themeBtn.lastElementChild.style.display = "none"
        changeImg.classList.remove("img-hero-dark")
        changeImg.classList.add("img-hero")
        liChange.forEach(item => {
            item.classList.remove("dark-todo")
            item.classList.remove("dark-border")
            item.classList.add("light-todo")
        });
        btnChange.forEach(item => {
            item.classList.remove("dark-todo-button")
            item.classList.add("light-todo-button")
        });
        spaceChange.forEach(item => {
            item.classList.remove("dark-todo");
            item.classList.add("light-todo")
        })
    }
    bodyChange.classList.toggle("dark-body")
    inputChange.classList.toggle("dark-todo")
}

// DODAWANIE NOWEGO TODO'SA (LI)
const addNewTask = (event) => {
    if(event.key == 'Enter' && $todoInput.value != ""){
        console.log($todoInput.value);
        $newTask = document.createElement("li");

        if($themeBtn.firstElementChild.style.display !== "none"){
            $newTask.classList.add("light-todo")
            $newTask.innerText = $todoInput.value;
        }else{
            $newTask.classList.add("dark-todo")
            $newTask.classList.add("dark-border")
            $newTask.innerText = $todoInput.value;
        }
        
        $todoList.insertBefore($newTask, $todoList.lastElementChild);
        createBtnTodo();
        showAllTodo();
        itemCount();
        $todoInput.value = "";
}}

// TWORZENIE BTN DLA TODO (wywołanie w addNewTask)
const createBtnTodo = () => {
    const deleteBtn = document.createElement("button")
    const checkBox = document.createElement("input")
    $newTask.prepend(checkBox);
    $newTask.append(deleteBtn);

    checkBox.setAttribute("type", "checkbox")
    checkBox.classList.add("todo-checkbox")

    $themeBtn.firstElementChild.style.display !== "none" ? deleteBtn.classList.add("light-todo-button") : deleteBtn.classList.add("dark-todo-button");

    deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>'
}

// SPRAWDZAMY, KTÓRE ZADANIA SĄ JUŻ ZAKOŃCZONE
const ifCompleted = (e) => {
    if(e.target.closest("input")){
        if(e.target.closest("input").checked == true){
            e.target.closest("li").classList.add("completed")
        }else{
            e.target.closest("li").classList.remove("completed")
        }
    }
}

// usunięcie wybranego taska 
const deleteTask = (e) => {
    if(e.target.closest("button")){
        if(e.target.closest("button").classList == "light-todo-button" || e.target.closest("button").classList == "dark-todo-button"){
            e.target.closest("li").remove();
        }
    }
}  

// usuwamy gotowe juz todo
const clearComplete = (e) => {
    const allTask = document.querySelectorAll(".completed");
    allTask.forEach(item => {
        item.remove();
    });
}

// POKAZUJE NAM WSZYSTKIE TODO NA LIŚCIE
const showAllTodo = () =>{
    const allTodo = document.querySelectorAll(".todo-list li")
    allTodo.forEach(item =>{
        item.classList.remove("scaleChangeUp")
    })
    if($allBtn.classList !== "active"){
        $allBtn.classList.add("active");
        $activeBtn.classList.remove("active");
        $completedBtn.classList.remove("active");
    }
}

// POKAZUJE NAM AKTYWWNE TODO NA LIŚCIE
const showActiveTodo = () =>{
    const allTodo = document.querySelectorAll(".todo-list li")
    
    if($activeBtn.classList !== "active"){
        $activeBtn.classList.add("active");
        $allBtn.classList.remove("active");
        $completedBtn.classList.remove("active");
    }
    allTodo.forEach(item =>{
        if(item.querySelector("input")){
        if(item.querySelector("input").checked == true){
            item.classList.add("scaleChangeUp")
        }else if(item.querySelector("input").checked == false){
            item.classList.remove("scaleChangeUp")
        }
    }})
}

// POKAZUJE NAM UKOŃCZONE TODO NA LIŚCIE
const showCompletedTodo = () =>{
    const allTodo = document.querySelectorAll(".todo-list li")
    if($completedBtn.classList !== "active"){
        $completedBtn.classList.add("active");
        $activeBtn.classList.remove("active");
        $allBtn.classList.remove("active");
    }
    allTodo.forEach(item =>{
        if(item.querySelector("input")){
        if(item.querySelector("input").checked == false){
            item.classList.add("scaleChangeUp")
        }else if(item.querySelector("input").checked == true){
            item.classList.remove("scaleChangeUp")
        }
    }})
}

// funkcja do zliczenia todosow do zrobienia
const itemCount = () => {
    const allTodo = document.querySelectorAll('.todo-list li');
    const textChange = document.querySelector(".item-left")
    let todoCount = 0;

        allTodo.forEach(item =>{
            if(!item.classList.contains("completed") && !item.classList.contains("todo-options")){
            todoCount++;
            }
        })

    textChange.innerText = `${todoCount} items left`
}

// wywyołujemy główną funkcje, gdy cały dokument się załaduje
document.addEventListener('DOMContentLoaded', main);