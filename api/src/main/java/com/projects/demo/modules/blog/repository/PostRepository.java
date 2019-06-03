package com.projects.demo.modules.blog.repository;

import com.projects.demo.modules.blog.entity.Post;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends CrudRepository<Post, Long> {
    Iterable<Post> findByPostCategory_Id(Long id);
}
