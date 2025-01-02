package com.main.todolist.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class TaskNotValidException extends RuntimeException {

    public TaskNotValidException(String message) {
        super(message);
    }
}
