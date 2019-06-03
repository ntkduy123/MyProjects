package com.projects.demo.modules.blog.specification;

import com.projects.demo.modules.blog.exception.NotImplementedException;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.lang.reflect.ParameterizedType;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public abstract class AbstractSpecification<T> implements Specification<T> {
    @Override
    public boolean isSatisfiedBy(T t) {
        throw new NotImplementedException();
    }

    @Override
    public Predicate toPredicate(Root<T> root, CriteriaBuilder cb) {
        throw new NotImplementedException();
    }

    @Override
    public Class<T> getType() {
        ParameterizedType type = (ParameterizedType) this.getClass().getGenericSuperclass();
        return (Class<T>)type.getActualTypeArguments()[0];
    }
}
