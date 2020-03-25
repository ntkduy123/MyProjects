package com.projects.demo.modules.todo.service;

import com.projects.demo.modules.blog.exception.ResourceNotFoundException;
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

    public TaskLabel save(TaskLabel taskLabel) {
        return taskLabelRepository.save(taskLabel);
    }

    public void delete(Long id) {
       taskLabelRepository.delete(taskLabelRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Task Labels ID %s does not exist", id)))
        );
    }
}
