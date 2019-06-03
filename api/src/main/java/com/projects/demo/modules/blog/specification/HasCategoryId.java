package com.projects.demo.modules.blog.specification;

import com.projects.demo.modules.blog.entity.Post;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class HasCategoryId extends AbstractSpecification<Post> {

    private Long categoryId;

    public HasCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    @Override
    public boolean isSatisfiedBy(Post post) {
        return this.categoryId.equals(post.getPostCategory().getId());
    }

    @Override
    public Predicate toPredicate(Root<Post> post, CriteriaBuilder cb) {
        return cb.and(cb.equal(post.join("postCategory").get("id"), this.categoryId));
    }
}
