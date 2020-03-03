package com.projects.demo.modules.todo.service;

import com.projects.demo.modules.domain.TaskLabel;
import com.projects.demo.modules.todo.repository.TaskLabelRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class TaskLabelService {
    @Resource
    private TaskLabelRepository taskLabelRepository;

    public Iterable<TaskLabel> findAll() {
        return taskLabelRepository.findAll();
    }
}
