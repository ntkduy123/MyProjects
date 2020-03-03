package com.projects.demo.modules.todo.service;

import com.projects.demo.modules.auth.repository.UserRepository;
import com.projects.demo.modules.auth.service.UserService;
import com.projects.demo.modules.blog.exception.ResourceNotFoundException;
import com.projects.demo.modules.domain.*;
import com.projects.demo.modules.todo.repository.TaskLabelRepository;
import com.projects.demo.modules.todo.repository.TaskRepository;
import com.projects.demo.modules.todo.repository.TaskStatusRepository;
import com.projects.demo.modules.todo.repository.TaskTypeRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashSet;
import java.util.Set;

@Service
public class TaskService {

    @Resource
    private TaskRepository taskRepository;

    @Resource
    private TaskTypeRepository taskTypeRepository;

    @Resource
    private TaskStatusRepository taskStatusRepository;

    @Resource
    private TaskLabelRepository taskLabelRepository;

    @Resource
    private UserRepository userRepository;

    public Task saveOrUpdate(Task task) {
        Long taskTypeId = task.getTaskType().getId();
        TaskType taskType = taskTypeRepository
                .findById(taskTypeId)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Task Type ID %s does not exist", taskTypeId)));
        task.setTaskType(taskType);

        Long taskStatusId = task.getTaskStatus().getId();
        TaskStatus taskStatus = taskStatusRepository
                .findById(taskStatusId)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Task Status ID %s does not exist", taskStatusId)));
        task.setTaskStatus(taskStatus);

        Set<TaskLabel> taskLabels = new HashSet<>();
        for (TaskLabel taskLabel : task.getTaskLabels()) {
            Long taskLabelId = taskLabel.getId();
            taskLabels.add(taskLabelRepository
                    .findById(taskLabelId)
                    .orElseThrow(() -> new ResourceNotFoundException(String.format("Task Labels ID %s does not exist", taskLabelId))));
        }
        task.setTaskLabels(taskLabels);

        Long assigneeId = task.getAssignee().getId();
        User assignee = userRepository
                .findById(assigneeId)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Assignee ID %s does not exist", assigneeId)));
        task.setAssignee(assignee);

        Long reporterId = task.getReporter().getId();
        User reporter = userRepository
                .findById(reporterId)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Reporter ID %s does not exist", reporterId)));
        task.setReporter(reporter);

        return taskRepository.save(task);
    }

    public Iterable<Task> findAll() {
        return taskRepository.findAll();
    }
}
