package com.projects.demo.modules.tinyurl.repository;

import com.projects.demo.modules.blog.entity.Post;
import com.projects.demo.modules.tinyurl.entity.URL;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface URLRepository extends CrudRepository<URL, Long> {
    Optional<URL> findOneByOriginalURL(String originalURL);
}
