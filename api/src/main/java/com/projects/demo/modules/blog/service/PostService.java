package com.projects.demo.modules.blog.service;

import com.projects.demo.modules.blog.constant.PostConstants;
import com.projects.demo.modules.blog.entity.Post;
import com.projects.demo.modules.blog.entity.PostCategory;
import com.projects.demo.modules.blog.entity.PostStatus;
import com.projects.demo.modules.blog.exception.ResourceNotFoundException;
import com.projects.demo.modules.blog.repository.PostCategoryRepository;
import com.projects.demo.modules.blog.repository.PostRepository;
import com.projects.demo.modules.blog.repository.PostStatusRepository;
import org.hibernate.query.criteria.internal.CriteriaBuilderImpl;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.persistence.criteria.CriteriaBuilder;

@Service
public class PostService {

    @Resource
    private PostRepository postRepository;

    @Resource
    private PostCategoryRepository postCategoryRepository;

    @Resource
    private PostStatusRepository postStatusRepository;

    public Post saveOrUpdate(Post post) {
        Long postCategoryId = post.getPostCategory().getId();
        PostCategory postCategory = postCategoryRepository
                .findById(postCategoryId)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Post Category ID %s does not exist", postCategoryId)));
        post.setPostCategory(postCategory);

        Long postStatusId = PostConstants.STATUS_PENDING;
        PostStatus postStatus = postStatusRepository
                .findById(postStatusId)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("Post Status ID %s does not exist", postStatusId)));
        post.setPostStatus(postStatus);

        return postRepository.save(post);
    }

    public Iterable<Post> findAll() {
        return postRepository.findAll();
    }

    public Iterable<Post> findByCategory(Long categoryId) {
        try {
            return postRepository.findByPostCategory_Id(categoryId);
        } catch (Exception e) {
            throw new ResourceNotFoundException(String.format("Post Category ID %s does not exist", categoryId));
        }
    }

    public Post findById(Long id) {
        return postRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        String.format("Post ID %s does not exist", id))
                );
    }

}
