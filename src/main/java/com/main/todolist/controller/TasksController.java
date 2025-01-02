package com.main.todolist.controller;

import com.main.todolist.model.Task;
import com.main.todolist.model.TaskDTO;
import com.main.todolist.service.AddTaskService;
import com.main.todolist.service.GetTasksService;
import com.main.todolist.service.MarkTaskAsCompletedService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class TasksController {
    private final AddTaskService addTaskService;
    private final GetTasksService getTasksService;
    private final MarkTaskAsCompletedService markTaskAsCompletedService;

    public TasksController(AddTaskService addTaskService, GetTasksService getTasksService, MarkTaskAsCompletedService markTaskAsCompletedService) {
        this.addTaskService = addTaskService;
        this.getTasksService = getTasksService;
        this.markTaskAsCompletedService = markTaskAsCompletedService;
    }

    @PostMapping("/task/create")
    public ResponseEntity<TaskDTO> createTask(@RequestBody Task task) {
        return addTaskService.execute(task);
    }

    @GetMapping("/task/get")
    public ResponseEntity<List<Task>> getTasks() {
        return getTasksService.execute(null);
    }

    @PutMapping("/task/complete/{id}")
    public ResponseEntity<TaskDTO> markTaskAsCompleted(@PathVariable Integer id) {
        return markTaskAsCompletedService.execute(id);
    }
}
