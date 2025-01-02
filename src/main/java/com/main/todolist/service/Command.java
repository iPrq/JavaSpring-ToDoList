package com.main.todolist.service;

public interface Command<I,O> {
    O execute(I input);
}
