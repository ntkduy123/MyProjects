package com.projects.demo.modules.todo.repository;

import com.projects.demo.modules.domain.TaskLabel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskLabelRepository extends CrudRepository<TaskLabel, Long> {
}
