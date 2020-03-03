package com.projects.demo.modules.todo.service;

import com.projects.demo.modules.domain.TaskType;
import com.projects.demo.modules.todo.repository.TaskTypeRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class TaskTypeService {

    @Resource
    private TaskTypeRepository taskTypeRepository;

    public Iterable<TaskType> findAll() {
        return taskTypeRepository.findAll();
    }
}
