package com.main.todolist.service;

import com.main.todolist.model.TasksRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class DeleteTaskService implements Command<Integer, ResponseEntity<Void>> {
    private final TasksRepository tasksRepository;

    public DeleteTaskService(TasksRepository tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    @Override
    public ResponseEntity<Void> execute(Integer input) {
        tasksRepository.deleteById(input);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
