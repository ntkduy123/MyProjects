package com.projects.demo.modules.todo.api;

import com.projects.demo.modules.blog.service.MapValidationErrorService;
import com.projects.demo.modules.domain.Task;
import com.projects.demo.modules.domain.TaskLabel;
import com.projects.demo.modules.domain.TaskStatus;
import com.projects.demo.modules.domain.TaskType;
import com.projects.demo.modules.todo.service.TaskLabelService;
import com.projects.demo.modules.todo.service.TaskService;
import com.projects.demo.modules.todo.service.TaskStatusService;
import com.projects.demo.modules.todo.service.TaskTypeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;

@Controller
@ResponseBody
@RequestMapping("/api/task")
public class TaskController {

    @Resource
    private TaskService taskService;

    @Resource
    private TaskTypeService taskTypeService;

    @Resource
    private TaskLabelService taskLabelService;

    @Resource
    private TaskStatusService taskStatusService;

    @Resource
    private MapValidationErrorService mapValidationErrorService;

    @GetMapping(value = "/type")
    public Iterable<TaskType> getTaskTypes() {
        return taskTypeService.findAll();
    }

    @GetMapping(value = "/label")
    public Iterable<TaskLabel> getTaskLabels() {
        return taskLabelService.findAll();
    }

    @GetMapping(value = "/status")
    public Iterable<TaskStatus> getTaskStatus() {
        return taskStatusService.findAll();
    }

    @PostMapping("")
    public ResponseEntity<?> saveOrUpdate(@Valid @RequestBody Task task, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        Task newTask = taskService.saveOrUpdate(task);
        return new ResponseEntity<>(newTask, HttpStatus.CREATED);
    }

    @GetMapping("")
    public Iterable<Task> getTasks() {
        return taskService.findAll();
    }
}
