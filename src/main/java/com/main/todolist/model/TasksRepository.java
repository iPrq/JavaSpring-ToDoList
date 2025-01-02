package com.main.todolist.model;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TasksRepository extends JpaRepository<Task,Integer> {
}
