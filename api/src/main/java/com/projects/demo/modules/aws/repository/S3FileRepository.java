package com.projects.demo.modules.aws.repository;

import com.projects.demo.modules.aws.entity.S3File;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface S3FileRepository extends CrudRepository<S3File, Long> {
}
