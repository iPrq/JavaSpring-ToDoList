package com.main.todolist.service;

import com.main.todolist.model.Task;
import com.main.todolist.model.TaskDTO;
import com.main.todolist.model.TasksRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MarkTaskAsCompletedService implements Command<Integer, ResponseEntity<TaskDTO>> {
    private final TasksRepository tasksRepository;

    public MarkTaskAsCompletedService(TasksRepository tasksRepository) {
        this.tasksRepository = tasksRepository;
    }

    @Override
    public ResponseEntity<TaskDTO> execute(Integer id) {
        Optional<Task> task = tasksRepository.findById(id);
        if(task.isPresent()) {
            Task taskToComplete = task.get();
            taskToComplete.setStatus(TaskStatus.COMPLETED.getStatus());
            tasksRepository.save(taskToComplete);
            return ResponseEntity.status(HttpStatus.OK).body(new TaskDTO(taskToComplete));
        }
        return null;
    }
}
