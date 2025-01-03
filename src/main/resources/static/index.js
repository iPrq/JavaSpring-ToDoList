const taskname = document.getElementById('taskname');
const addtaskhtml = document.getElementById('addtaskhtml');
let tasktype;
let status;

console.log('JS working');
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
    console.log("Opening addtask.html");
    window.open('addtask.html');

}
