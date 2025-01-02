package com.main.todolist.model;

public class TaskDTO {

    String TaskName;
    int Status;

    public TaskDTO(Task task) {
        this.TaskName = task.getTaskname();
        this.Status = task.getStatus();
    }

    public String getTaskName() {
        return TaskName;
    }

    public void setTaskName(String taskName) {
        TaskName = taskName;
    }

    public int getStatus() {
        return Status;
    }

    public void setStatus(int status) {
        Status = status;
    }
}
