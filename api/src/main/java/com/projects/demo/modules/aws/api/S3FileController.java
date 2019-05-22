package com.projects.demo.modules.aws.api;

import com.projects.demo.modules.aws.entity.S3File;
import com.projects.demo.modules.aws.service.S3FileService;
import com.projects.demo.modules.blog.dto.ResponseMessage;
import com.projects.demo.modules.util.FileUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.io.File;

@Controller
@ResponseBody
@RequestMapping("/api/aws/s3")
public class S3FileController {

    @Resource
    private S3FileService s3FileService;

    @PostMapping("")
    public ResponseEntity<?> saveOrUpdate(@RequestParam("file") MultipartFile multipartFile) {
        try {
            File file = FileUtil.convertMultiPartToFile(multipartFile);
            S3File s3File = s3FileService.upload(file);
            S3File uploadedFile = s3FileService.saveOrUpdate(s3File);
            return new ResponseEntity<>(uploadedFile, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(new ResponseMessage("Error uploading images"), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}")
    public S3File delete(@PathVariable("id") Long id) {
        return s3FileService.delete(id);
    }

    @GetMapping("")
    public Iterable<S3File> findAll() {
        return s3FileService.findAll();
    }

}

