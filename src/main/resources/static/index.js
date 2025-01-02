const taskname = document.getElementById('task');
let tasktype;
let status;

console.log("Working")

document.addEventListener('DOMContentLoaded', function() {
    const tasktypes = document.querySelectorAll('#types li')
    tasktypes.forEach(item => {
        item.addEventListener('click',(event) => {
            tasktype = event.target.innerHTML;
        });
    });
});

function addtask() {
    if(taskname && tasktype) {
    const task = taskname.value;
    status = 0;
    posttask(task, tasktype, status);
    console.log('Task working')
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

