const tasklist = document.getElementById("unorderedlist");
const addtaskhtml = document.getElementById('addtaskhtml');
let tasktype;
let status;

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
        console.log(data);
    } 
    else if(!response.ok) {
        console.log("Error");
    }
}

function showtask() {
    gettasks();
    console.log("Showing tasks");
}

function openaddtaskhtml() {
    window.open("addtask.html");
}

function addtask(taskName, taskType, status) {
    let clonedtask = document.getElementById("tasktemplate").cloneNode(true);
    clonedtask.id = `task1`;
    
    // Get labels and other elements within the cloned task
    let labels = clonedtask.querySelectorAll("label");
    let typeDiv = clonedtask.querySelector("div"); // Adjust the selector as needed
    
    // Reference the label elements correctly
    let tasknameLabel = labels[0];
    let statusLabel = labels[1];
    
    // Update text content of the labels
    tasknameLabel.textContent = taskName;
    typeDiv.textContent = taskType;
    
    if (status === 1) {
        statusLabel.textContent = "Complete";
    } else {
        statusLabel.textContent = "Incomplete";
    }

    // Append the cloned task to the task list
    document.getElementById("tasklist").appendChild(clonedtask);
}

function addtaskclicked() {
    let taskname = document.getElementById("newtaskname").value;
    let tasktype = document.getElementById("newtasktype").value;
    console.log(tasktype)
    opener.addtask(taskname,tasktype,0);
    save = true;
    if(save===true) {
        posttask(taskname,tasktype,0);
    }
}