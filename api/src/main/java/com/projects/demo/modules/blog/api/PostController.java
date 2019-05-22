package com.projects.demo.modules.blog.api;

import com.projects.demo.modules.blog.entity.Post;
import com.projects.demo.modules.blog.entity.PostCategory;
import com.projects.demo.modules.blog.service.MapValidationErrorService;
import com.projects.demo.modules.blog.service.PostCategoryService;
import com.projects.demo.modules.blog.service.PostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;

@Controller
@ResponseBody
@RequestMapping("/api/post")
public class PostController {

    @Resource
    private PostService postService;

    @Resource
    private PostCategoryService postCategoryService;

    @Resource
    private MapValidationErrorService mapValidationErrorService;

    @GetMapping("")
    public Iterable<Post> findAll() {
        return postService.findAll();
    }

    @GetMapping("/{id}")
    public Post getPostById(@PathVariable("id") Long id) {
        return postService.findById(id);
    }

    @PostMapping("")
    public ResponseEntity<?> saveOrUpdate(@Valid @RequestBody Post post, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap!=null) return errorMap;

        Post newPost = postService.saveOrUpdate(post);
        return new ResponseEntity<>(newPost, HttpStatus.CREATED);
    }

    @GetMapping(value = "/category")
    public Iterable<PostCategory> getPostCategory() {
        return postCategoryService.findAll();
    }
}
