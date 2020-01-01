package com.projects.demo.modules.blog.repository;

import com.projects.demo.modules.domain.PostCategory;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostCategoryRepository extends CrudRepository<PostCategory, Long> {
}
