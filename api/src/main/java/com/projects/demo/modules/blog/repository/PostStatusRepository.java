package com.projects.demo.modules.blog.repository;

import com.projects.demo.modules.blog.entity.PostStatus;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostStatusRepository extends CrudRepository<PostStatus, Long> {
}
