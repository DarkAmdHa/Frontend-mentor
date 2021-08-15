let tasks=0;
document.querySelector('.items-left').innerText = tasks;

document.addEventListener('DOMContentLoaded', displayTasksInLS);
//Add Task Input Field
const inputField = document.querySelector('.add-task');

//Night mode
const night = document.querySelector('.night-mode');
night.addEventListener('click', turnOnNightMode);


//Day Mode
const day = document.querySelector('.day-mode');
day.addEventListener('click',turnOnDayMode);


//Add a new task
document.querySelector('.add-task').addEventListener('keypress', addTask);

//Completed or Remove a task
document.querySelector('.to-dos').addEventListener('click', completeOrRemoveTask);

//Clear completed tasks
document.querySelector('.clear').addEventListener('click', clearCompletedTasks);

//Select All
document.querySelector('.selectall').addEventListener('click', checkAllTasks);


//Show Completed Tasks Only

document.querySelector('.completed').addEventListener('click', showCompletedTasks);



//Show Active Tasks Only

document.querySelector('.active').addEventListener('click', showActiveTasks);



//Show all Tasks Only

document.querySelector('.all').addEventListener('click', showAllTasks);


function turnOnNightMode(){
    //Turn on dark mode
    document.querySelector('.night').style.display = 'none';
    document.querySelector('.day').style.display = 'block';

    //Change body bg and default colors
    setTimeout(()=>{
        document.querySelector('body').style.background = 'url(./images/bg-desktop-dark.jpg) no-repeat, hsl(235, 21%, 11%)';
        document.querySelector('body').style.color = 'hsl(234, 39%, 85%)';
        document.querySelector('body').style.backgroundSize = '100vw';

    },100);
    
    //Dark color for containers
    document.querySelectorAll('.task-container').forEach(task =>{task.classList.toggle('dark');});
    document.querySelector('.add-task').classList.toggle('dark');
    document.querySelectorAll('.checkmark').forEach(checkmark =>{checkmark.classList.toggle('dark');});
    document.querySelector('.to-dos').classList.toggle('dark');
    document.querySelector('.all').firstElementChild.classList.toggle('dark');
    document.querySelector('.active').firstElementChild.classList.toggle('dark');
    document.querySelector('.completed').firstElementChild.classList.toggle('dark');
    document.querySelector('.clear').classList.toggle('dark');
}

function turnOnDayMode(){
    document.querySelector('.day').style.display = 'none';
    document.querySelector('.night').style.display = 'block';
    

    setTimeout(()=>{
        document.querySelector('body').style.background = 'url(./images/bg-desktop-light.jpg) no-repeat, hsl(236, 33%, 92%)';
        document.querySelector('body').style.color = 'hsl(235, 19%, 35%)';
        document.querySelector('body').style.backgroundSize = '100vw';
    },100);

    document.querySelectorAll('.task-container').forEach(task =>{task.classList.toggle('dark');});
    document.querySelector('.add-task').classList.toggle('dark');
    document.querySelectorAll('.checkmark').forEach(checkmark =>{checkmark.classList.toggle('dark');});
    document.querySelector('.to-dos').classList.toggle('dark');
    document.querySelector('.all').firstElementChild.classList.toggle('dark');
    document.querySelector('.active').firstElementChild.classList.toggle('dark');
    document.querySelector('.completed').firstElementChild.classList.toggle('dark');
    document.querySelector('.clear').classList.toggle('dark');
}


function addTask(e){
    if(e.key === 'Enter'){
        if (inputField.value!=''){
            document.querySelector('.empty').style.opacity = '0';
            const li =document.createElement('li');
            li.className = 'to-do';
            const div =document.createElement('div');
            div.className = 'task-container';
            const input =document.createElement('input');
            input.className = 'task-select';
            input.classList.add('task-selector');
            input.type = 'checkbox';
            const span = document.createElement('span');
            span.className = 'checkmark';
            const border = document.createElement('div');
            border.className = 'border';
            const cross = document.createElement('a');
            cross.href = '#';
            const img = document.createElement('img');
            img.src = 'images/icon-cross.svg';
            img.alt='Remove Task';
            img.className = 'remove-task';
            const p = document.createElement('p');
            p.className = 'task-name';
            p.innerText = inputField.value;
            addTaskToLS(inputField.value);
            cross.appendChild(img);
            div.appendChild(input);
            div.appendChild(span);
            div.appendChild(border);
            div.appendChild(p);
            div.appendChild(cross);

            li.appendChild(div);

            document.querySelector('.to-dos').firstElementChild.appendChild(li);
            setTimeout(()=>{
                document.querySelector('.to-do:last-child').firstElementChild.style.transform = 'translateX(0)';
                document.querySelector('.to-do:last-child').firstElementChild.style.opacity= '1';
            },100);
            inputField.value = '';
            tasks++;
            document.querySelector('.items-left').innerText = tasks;
            }
        else{
                //To Do 
        }        

    }
}

function completeOrRemoveTask(e){
    if(e.target.classList.contains('task-select') && e.target.checked){
        const taskName = e.target.nextElementSibling.nextElementSibling;
        taskName.innerHTML = `<del>${taskName.textContent}</del>`;

        //Add indicator for later clearing task:
        e.target.parentElement.classList.add('completed-task');
        tasks--;
        document.querySelector('.items-left').innerText = tasks;
    }
    else if(e.target.classList.contains('task-select') && !e.target.checked){
        const taskName = e.target.nextElementSibling.nextElementSibling;
        taskName.innerHTML = `${taskName.textContent}`;
        //Removing indicator in case task not cleared yet
        tasks++;
        document.querySelector('.items-left').innerText = tasks;
        e.target.parentElement.classList.remove('completed-task');
    }
    if(e.target.classList.contains('remove-task')){
        setTimeout(()=>{
            e.target.parentElement.parentElement.style.transform = 'translateX(800px)';
            e.target.parentElement.parentElement.style.opacity = '0';
        },100);
        setTimeout(()=>{
            if(!e.target.parentElement.parentElement.firstElementChild.checked){
                tasks--;
            }
            document.querySelector('.items-left').innerText = tasks; 
            
            removeTaskFromLS(e.target.parentElement.previousElementSibling);

            e.target.parentElement.parentElement.parentElement.remove();
            if(tasks === 0){
            document.querySelector('.empty').style.opacity = '1';
            }
        },800);

    }
}

function clearCompletedTasks(e){
    document.querySelectorAll('.completed-task').forEach(completedTask =>{
        setTimeout(()=>{
            completedTask.style.transform = 'translateX(800px)';
            completedTask.style.opacity = '0';
        },100);
        setTimeout(()=>{

            removeTaskFromLS(completedTask.children[3]);

            completedTask.parentElement.remove();
            if(tasks===0){
                document.querySelector('.empty').style.opacity = '1';
            }
        },800);
        document.querySelector('.selectall').checked = false;
    });
}

function checkAllTasks(e){
    if(e.target.checked){
        document.querySelectorAll('.task-selector').forEach(task=>{
            if(!task.checked){
                task.click();
            }
        });
    }
    else{
        document.querySelectorAll('.task-selector').forEach(task=>{
            task.click();
            
        });
    }
    
}

function showCompletedTasks(e){
    document.querySelector('.selected').classList.remove('selected');
    e.target.classList.add('selected');
    document.querySelectorAll('.to-do').forEach(task=>{
        if(task.firstElementChild.firstElementChild.checked){
            task.style.display='block';
        }
        else{
            task.style.display='none';
        }
    });
    if(tasks != 0){
        document.querySelector('.empty').style.opacity = '1';
    }
    else{
        document.querySelector('.empty').style.opacity = '0';

    }
}


function showActiveTasks(e){
    document.querySelector('.selected').classList.remove('selected');
    e.target.classList.add('selected');
    document.querySelectorAll('.to-do').forEach(task=>{
        if(task.firstElementChild.firstElementChild.checked){
            task.style.display='none';
        }
        else{
            task.style.display='block';
        }
    });
    if(tasks === 0){
        document.querySelector('.empty').style.opacity = '1';
    }
    else{
        document.querySelector('.empty').style.opacity = '0';

    }
}



function showAllTasks(e){
    document.querySelector('.selected').classList.remove('selected');
    e.target.classList.add('selected');
    document.querySelectorAll('.to-do').forEach(task=>{
            task.style.display='block';
    });
}


//Add To Local Storage


function getTasks(){
    let taskList;
    if (localStorage.getItem('tasks')===null){
        taskList = [];
    }
    else{
        taskList = JSON.parse(localStorage.getItem('tasks'));
    }
    return taskList;
}


function addTaskToLS(task){
    const taskList=getTasks();
    taskList.push(task);
    localStorage.setItem('tasks', JSON.stringify(taskList));
}

function displayTasksInLS(){
    const taskList= getTasks();
    if(taskList!=[]){
        taskList.forEach((task,index)=>{
            document.querySelector('.empty').style.opacity = '0';
            const li =document.createElement('li');
            li.className = 'to-do';
            const div =document.createElement('div');
            div.className = 'task-container';
            const input =document.createElement('input');
            input.className = 'task-select';
            input.classList.add('task-selector');
            input.type = 'checkbox';
            const span = document.createElement('span');
            span.className = 'checkmark';
            const border = document.createElement('div');
            border.className = 'border';
            const cross = document.createElement('a');
            cross.href = '#';
            const img = document.createElement('img');
            img.src = 'images/icon-cross.svg';
            img.alt='Remove Task';
            img.className = 'remove-task';
            const p = document.createElement('p');
            p.className = 'task-name';
            p.innerText = task;
            
            cross.appendChild(img);
            div.appendChild(input);
            div.appendChild(span);
            div.appendChild(border);
            div.appendChild(p);
            div.appendChild(cross);

            li.appendChild(div);

            document.querySelector('.to-dos').firstElementChild.appendChild(li);
            setTimeout(()=>{
                document.querySelector(`.to-do:nth-child(${index+2})`).firstElementChild.style.transform = 'translateX(0)';
                document.querySelector(`.to-do:nth-child(${index+2})`).firstElementChild.style.opacity= '1';
            },100);
            tasks++;
        });
        document.querySelector('.items-left').innerText = tasks;
    }
}

function removeTaskFromLS(task){
    const taskList=getTasks();
    taskList.forEach((taskInLS,index)=>{
        if(task.textContent === taskInLS || task.value === taskInLS){
            taskList.splice(index,1);
        }
    });
    localStorage.setItem('tasks', JSON.stringify(taskList));
}
