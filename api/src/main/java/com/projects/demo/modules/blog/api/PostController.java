package com.projects.demo.modules.blog.api;

import com.projects.demo.modules.blog.entity.Post;
import com.projects.demo.modules.blog.entity.PostCategory;
import com.projects.demo.modules.blog.repository.BaseRepository;
import com.projects.demo.modules.blog.service.MapValidationErrorService;
import com.projects.demo.modules.blog.service.PostCategoryService;
import com.projects.demo.modules.blog.service.PostService;
import com.projects.demo.modules.blog.specification.AndSpecification;
import com.projects.demo.modules.blog.specification.HasCategoryId;
import com.projects.demo.modules.blog.specification.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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

    @Resource
    private BaseRepository baseRepository;

//    @GetMapping("")
//    public Iterable<Post> findPost() {
//        return postService.findAll();
//    }

    @GetMapping("")
    public Iterable<Post> findByCategory(@RequestParam("categoryId") Long categoryId) {
        List<Specification<Post>> specs = new ArrayList<>();

        if (categoryId != null) {
            specs.add(new HasCategoryId(categoryId));
        }

        Specification<Post> specification = new AndSpecification<>(specs);
        return baseRepository.findAllBySpecification(specification);
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
