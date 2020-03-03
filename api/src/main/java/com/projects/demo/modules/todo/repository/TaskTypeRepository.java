package com.projects.demo.modules.todo.repository;

import com.projects.demo.modules.domain.TaskType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskTypeRepository extends CrudRepository<TaskType, Long> {
}
