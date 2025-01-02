package com.main.todolist.model;

import jakarta.persistence.*;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "taskname")
    private String taskname;


    @Column(name = "type")
    private String type;

    @Column(name = "status")
    private int status;

  public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTaskname() {
        return taskname;
    }

    public void setTaskname(String taskname) {
        this.taskname = taskname;
    }

    public String getType() {
        return type.toLowerCase();
    }

    public void setType(String type) {
        this.type = type.toLowerCase();
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

}
