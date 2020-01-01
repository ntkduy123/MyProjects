package com.projects.demo.modules.blog.service;

import com.projects.demo.modules.domain.PostCategory;
import com.projects.demo.modules.blog.repository.PostCategoryRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class PostCategoryService {

    @Resource
    private PostCategoryRepository postCategoryRepository;

    public Iterable<PostCategory> findAll() {
        return postCategoryRepository.findAll();
    }

}
