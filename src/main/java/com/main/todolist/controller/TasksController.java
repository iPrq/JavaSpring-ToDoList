package com.main.todolist.controller;

import com.main.todolist.model.Task;
import com.main.todolist.model.TaskDTO;
import com.main.todolist.service.AddTaskService;
import com.main.todolist.service.DeleteTaskService;
import com.main.todolist.service.GetTasksService;
import com.main.todolist.service.MarkTaskAsCompletedService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/task")
public class TasksController {
    private final AddTaskService addTaskService;
    private final GetTasksService getTasksService;
    private final MarkTaskAsCompletedService markTaskAsCompletedService;
    private final DeleteTaskService deleteTaskService;

    public TasksController(AddTaskService addTaskService, GetTasksService getTasksService, MarkTaskAsCompletedService markTaskAsCompletedService, DeleteTaskService deleteTaskService) {
        this.addTaskService = addTaskService;
        this.getTasksService = getTasksService;
        this.markTaskAsCompletedService = markTaskAsCompletedService;
        this.deleteTaskService = deleteTaskService;
    }

    @PostMapping("/create")
    public ResponseEntity<TaskDTO> createTask(@RequestBody Task task) {
        return addTaskService.execute(task);
    }

    @GetMapping("/get")
    public ResponseEntity<List<Task>> getTasks() {
        return getTasksService.execute(null);
    }

    @PutMapping("/complete/{id}")
    public ResponseEntity<TaskDTO> markTaskAsCompleted(@PathVariable Integer id) {
        return markTaskAsCompletedService.execute(id);
    }

    @DeleteMapping("//delete/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Integer id) {
        return deleteTaskService.execute(id);
    }
}
