const tasklist = document.getElementById("unorderedlist");
const addtaskhtml = document.getElementById('addtaskhtml');
let tasktype;
let status;
let addhtml;
document.addEventListener('DOMContentLoaded', () => {gettasks()})
function tasktypeclicked() {
    tasktype = document.getElementById('tasktype').value;
}


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
        console.log(data);
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
    data.forEach(element => {addtask(element.taskname,element.type,element.status)})
}

function openaddtaskhtml() {
   addhtml = window.open("addtask.html");
}

function addtask(taskName, taskType, status) {
    let clonedtask = document.getElementById("tasktemplate").cloneNode(true);
    clonedtask.id = `task1`;
    
    // Get labels and other elements within the cloned task
    let labels = clonedtask.querySelectorAll("p");
    let divs = clonedtask.querySelectorAll("div"); // Adjust the selector as needed
    
    // Reference the label elements correctly
    let tasknameLabel = labels[0];
    let statusLabel = labels[1];
    let typeDiv = divs[0];
    let statusDiv = divs[1];
    // Update text content of the labels
    tasknameLabel.textContent = taskName;
    typeDiv.textContent = taskType;
    
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
    opener.addtask(taskname,tasktype,0);
    save = true;
    if(save===true) {
        posttask(taskname,tasktype,0);
    }
}
