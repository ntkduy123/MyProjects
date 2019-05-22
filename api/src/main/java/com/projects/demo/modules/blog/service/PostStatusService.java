package com.projects.demo.modules.blog.service;

import com.projects.demo.modules.blog.entity.PostStatus;
import com.projects.demo.modules.blog.repository.PostStatusRepository;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class PostStatusService {

    @Resource
    private PostStatusRepository postStatusRepository;

    public Iterable<PostStatus> findAll() {
        return postStatusRepository.findAll();
    }
}
