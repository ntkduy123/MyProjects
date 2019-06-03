package com.projects.demo.modules.blog.specification;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;

public class AndSpecification<T> extends AbstractSpecification<T> {

    private List<Specification<T>> specs;

    public AndSpecification(List<Specification<T>> specs) {
        this.specs = specs;
    }

    @Override
    public boolean isSatisfiedBy(T t) {
        return specs.stream()
                .map(spec -> spec.isSatisfiedBy(t))
                .reduce(Boolean.TRUE, Boolean::logicalAnd);
    }

    @Override
    public Predicate toPredicate(Root<T> root, CriteriaBuilder cb) {
        return cb.and(specs.stream().map(spec -> spec.toPredicate(root, cb)).toArray(Predicate[]::new));
    }

    @Override
    public Class<T> getType() {
        return specs.get(0).getType();
    }
}
