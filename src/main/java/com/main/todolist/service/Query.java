package com.main.todolist.service;

public interface Query <I,O> {
    O execute(I input);
}
