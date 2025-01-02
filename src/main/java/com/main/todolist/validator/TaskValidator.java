package com.main.todolist.validator;


import com.main.todolist.exceptions.TaskNotValidException;
import com.main.todolist.model.Task;

public class TaskValidator {

    public static void ValidateTask(Task task) {
        if(task.getStatus() != 0 && task.getStatus() != 1) {
            throw new TaskNotValidException("Invalid status");
        }
        else if(task.getTaskname() == null || task.getTaskname().isEmpty()) {
            throw new TaskNotValidException("Task name cannot be empty");
        }
        else if(task.getType() == null || task.getType().isEmpty()) {
            throw new TaskNotValidException("Undefined/Invalid type");
        }
    }
}
