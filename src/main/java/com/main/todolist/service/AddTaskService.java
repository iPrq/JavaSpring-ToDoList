package com.main.todolist.service;

import com.main.todolist.model.Task;
import com.main.todolist.model.TaskDTO;
import com.main.todolist.model.TasksRepository;
import com.main.todolist.validator.TaskValidator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AddTaskService implements Command<Task, ResponseEntity<TaskDTO>> {
    private final TasksRepository tasksRepository;


    public AddTaskService(TasksRepository tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    @Override
    public ResponseEntity<TaskDTO> execute(Task input) {
        TaskValidator.ValidateTask(input);
        Task savedtask = tasksRepository.save(input);
        return ResponseEntity.status(HttpStatus.CREATED).body(new TaskDTO(savedtask));
    }
}
