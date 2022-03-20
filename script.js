//define UI elements

let form = document.querySelector('#task_form');
let taskList = document.querySelector('ul');
let clearButton = document.querySelector('#clear_task_btn');
let filter = document.querySelector('#task_filter');
let taskInput = document.querySelector('#new_task');




//Define event listener

form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
clearButton.addEventListener('click', clearTask);
filter.addEventListener('keyup', filterTask);
document.addEventListener('DOMContentLoaded', getTasks);

//Define Funtion


//add task
function addTask(e){

    if(taskInput.value === ''){
        alert('Add a Task');
    }else{

        //create li element
        let li_task = document.createElement('li');
        li_task.appendChild(document.createTextNode(taskInput.value + " "));
        taskList.appendChild(li_task);

        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML = 'x';
        li_task.appendChild(link);

        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = ''; //to clear the task imput field
    }

    e.preventDefault();
}


//remove task
function removeTask(e){

    if(e.target.hasAttribute("href")){
        if(confirm("Are you sure?")){

            let ele = e.target.parentElement;
            ele.remove();
            //console.log(e.target);
            // e.target.parentElement.remove();

            removeFromLS(ele);
        }
        
    }
}

//clear task
function clearTask(e){

    if(confirm("Are you sure?")){
        taskList.innerHTML = " ";

    }

    localStorage.clear();

    //faster way

    // while(taskList.firstChild){
    //     taskList.removeChild(taskList.firstChild);
    // }
}


//filter task
function filterTask(e){

    let text = e.target.value.toLowerCase();

    document.querySelectorAll('li').forEach(task =>{

        let item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!= -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    })

    // console.log(text);
}

//store task in local storage

function storeTaskInLocalStorage(task){

    let allTasks;

    if(localStorage.getItem('allTasks') === null){
        allTasks = [];
    }else{
        allTasks = JSON.parse(localStorage.getItem('allTasks'));
    }

    allTasks.push(task);
    localStorage.setItem('allTasks', JSON.stringify(allTasks))
}

// get task

function getTasks(){

    let allTasks;

    if(localStorage.getItem('allTasks') === null){
        allTasks = [];
    }else{
        allTasks = JSON.parse(localStorage.getItem('allTasks'));
    }

    allTasks.forEach(task =>{

        let li_task = document.createElement('li');
        li_task.appendChild(document.createTextNode(task + " "));
        taskList.appendChild(li_task);

        let link = document.createElement('a');
        link.setAttribute('href','#');
        link.innerHTML = 'x';
        li_task.appendChild(link);
    });
}

function removeFromLS(taskItem){

    let allTasks;

    if(localStorage.getItem('allTasks') === null){
        allTasks = [];
    }else{
        allTasks = JSON.parse(localStorage.getItem('allTasks'));
    }

    let li = taskItem;
    li.removeChild(li.lastChild);

    allTasks.forEach((task, index) => {
        
        if(li.textContent.trim() === task){
            allTasks.splice(index, 1);
        }
    });

    localStorage.setItem('allTasks', JSON.stringify(allTasks));
} 