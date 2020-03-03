package com.projects.demo.modules.todo.service;

import com.projects.demo.modules.domain.TaskStatus;
import com.projects.demo.modules.todo.repository.TaskStatusRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class TaskStatusService {

    @Resource
    private TaskStatusRepository taskStatusRepository;

    public Iterable<TaskStatus> findAll() {
        return taskStatusRepository.findAll();
    }
}
