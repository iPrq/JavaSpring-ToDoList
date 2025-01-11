const tasklist = document.getElementById("unorderedlist");
const addtaskhtml = document.getElementById('addtaskhtml');
let tasktype;
let status;
let addhtml;
document.addEventListener('DOMContentLoaded', () => {gettasks()})
function tasktypeclicked() {
    tasktype = document.getElementById('tasktype').value;
}

document.addEventListener('storage', (event) =>
{if(event.key === 'reloadPage' && event.newValue === 'true'){
    location.reload();
    localStorage.setItem('reloadPage','false');
    console.log("reloaded")
}})


function addtask() {
    if(taskname !== null && tasktype !== null) {
    const task = taskname.value;
    status = 0;
    posttask(task, tasktype, status);
    console.log('Task working');
    }
    else{
        console.log(taskname)
        console.log(tasktype)
        console.log('Task invalid');
    }
}

async function posttask(task, tasktype, status) {
    
    const response = await fetch('http://localhost:8080/task/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({taskname: task, type: tasktype, status: status})
    });

    if(response.ok) {
        const data = await response.json();
        localStorage.setItem('reloadPage','false');
    }
    else if(!response.ok) {
        console.log("Error");
    }
}

async function gettasks() {
    const response = await fetch('http://localhost:8080/task/get', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        const data = await response.json();
        addtasklist(data);
    } 
    else if(!response.ok) {
        console.log("Error");
    }
}

function addtasklist(data) {
    data.forEach(element => {addtask(element.id,element.taskname,element.type,element.status)})
}

function openaddtaskhtml() {
   addhtml = window.open("addtask.html");
}

function addtask(id,taskName, taskType, status) {
    let clonedtask = document.getElementById("tasktemplate").cloneNode(true);
    clonedtask.id = `task${id}`;
    
    // Get labels and other elements within the cloned task
    let labels = clonedtask.querySelectorAll("p");
    let divs = clonedtask.querySelectorAll("div");
    let buttons = clonedtask.querySelectorAll("button"); // Adjust the selector as needed
    
    // Reference the label elements correctly
    let tasknameLabel = labels[0];
    let statusLabel = labels[1];
    let typeDiv = divs[0];
    let statusDiv = divs[1];
    let markAsDoneButton = buttons[0];
    let deleteTaskButton = buttons[1];
    // Update text content of the labels
    tasknameLabel.textContent = taskName;
    typeDiv.textContent = taskType;

    markAsDoneButton.id = `mark${id}`;
    deleteTaskButton.id = `delete${id}`;
    
    if (status === 1) {
        statusDiv.textContent = "Complete";
        statusDiv.classList.remove('statusincomplete');
        statusDiv.classList.add('statuscomplete');
    } else {
        statusDiv.textContent = "Pending";
    }

    // Append the cloned task to the task list
    document.getElementById("tasklist").appendChild(clonedtask);
}

function addtaskclicked() {
    let taskname = document.getElementById("newtaskname").value;
    let tasktype = document.getElementById("newtasktype").value;
    save = true;
    if(save===true) {
        posttask(taskname,tasktype,0);
    }
}

function markAsDoneButtonPressed(Buttonid) {
    const id = Buttonid.match(/\d+/)[0];
    const userResponse = window.confirm("Mark As Complete?");
    if(userResponse) {
       markAsComplete(id);
    }
}

function deleteTaskButtonPressed(Buttonid) {
    const id = Buttonid.match(/\d+/)[0];
    const userResponse = window.confirm("Are you sure?");
    if(userResponse) {
        deleteTaskMapping(id);
    }
}


async function deleteTaskMapping(id) {
   const response = await fetch(`http://localhost:8080/task/delete/${id}`, {
       method: `DELETE`,});

    if(response.status === 204) {
        location.reload();
    }
    else{
        console.log("Error");
    }
}

async function markAsComplete(id) {
    const response = await fetch(`http://localhost:8080/task/complete/${id}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
            }
        });
    if(!response.ok) {
        console.error("error");
    }
    else{
        location.reload();
    }
}
