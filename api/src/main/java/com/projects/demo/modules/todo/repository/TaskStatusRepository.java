package com.projects.demo.modules.todo.repository;

import com.projects.demo.modules.domain.TaskStatus;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskStatusRepository extends CrudRepository<TaskStatus, Long> {
}
