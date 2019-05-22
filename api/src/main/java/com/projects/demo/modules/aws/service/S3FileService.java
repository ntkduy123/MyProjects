package com.projects.demo.modules.aws.service;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.projects.demo.modules.aws.constant.AWSConstants;
import com.projects.demo.modules.aws.entity.S3File;
import com.projects.demo.modules.aws.repository.S3FileRepository;
import com.projects.demo.modules.blog.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.io.File;
import java.nio.file.Files;

@Service
public class S3FileService {

    @Resource
    private S3FileRepository s3FileRepository;

    public S3File saveOrUpdate(S3File file) {
        return s3FileRepository.save(file);
    }

    public S3File delete(Long id) {
        S3File file = s3FileRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(String.format("S3 File ID %s does not exist", id)));
        s3FileRepository.delete(file);

        this.remove(file.getName());

        return file;
    }

    public Iterable<S3File> findAll() {
        return s3FileRepository.findAll();
    }

    private AmazonS3 amazonS3;

    private void setup() {
        AWSCredentials awsCredentials = new BasicAWSCredentials(AWSConstants.ACCESS_KEY, AWSConstants.SECRET_KEY);
        amazonS3 = AmazonS3ClientBuilder
                .standard()
                .withRegion(Regions.AP_SOUTHEAST_1)
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .build();
    }

    public S3File upload(File file) {
        setup();
        amazonS3.putObject(new PutObjectRequest(AWSConstants.BUCKET_NAME, file.getName(), file).withCannedAcl(CannedAccessControlList.PublicRead));
        file.delete();
        return new S3File(file.getName(), amazonS3.getUrl(AWSConstants.BUCKET_NAME, file.getName()).toString());
    }

    public void remove(String fileName) {
        setup();
        amazonS3.deleteObject(new DeleteObjectRequest(
                AWSConstants.BUCKET_NAME, fileName
        ));
    }
}
