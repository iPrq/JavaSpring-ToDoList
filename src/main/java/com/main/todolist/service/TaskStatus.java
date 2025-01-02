package com.main.todolist.service;

import lombok.Getter;

public enum TaskStatus {
    PENDING(0),
    COMPLETED(1);
    private final int status;
    TaskStatus(int status) {
        this.status = status;
    }

    public int getStatus() {
        return status;
    }
}
