package com.main.todolist.service;

import com.main.todolist.model.Task;
import com.main.todolist.model.TasksRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GetTasksService implements Query<Void, ResponseEntity<List<Task>>> {
    private final TasksRepository tasksRepository;

    public GetTasksService(TasksRepository tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    @Override
    public ResponseEntity<List<Task>> execute(Void input) {
      List<Task> tasks = tasksRepository.findAll();
        return ResponseEntity.ok(tasks);
    }
}
