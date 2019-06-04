package com.projects.demo.modules.blog.specification;

import com.projects.demo.modules.blog.entity.Post;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

public class HasAuthor extends AbstractSpecification<Post> {

    private String author;

    public HasAuthor(String author) {
        this.author = author;
    }

    @Override
    public boolean isSatisfiedBy(Post post) {
        return this.author.equals(post.getAuthor());
    }

    @Override
    public Predicate toPredicate(Root<Post> root, CriteriaBuilder cb) {
        return cb.and(cb.equal(root.get("author"), this.author));
    }
}
