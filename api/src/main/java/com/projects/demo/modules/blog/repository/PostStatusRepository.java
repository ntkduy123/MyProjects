package com.projects.demo.modules.blog.repository;

import com.projects.demo.modules.domain.PostStatus;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostStatusRepository extends CrudRepository<PostStatus, Long> {
}
