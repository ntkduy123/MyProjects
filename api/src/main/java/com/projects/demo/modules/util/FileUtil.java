package com.projects.demo.modules.util;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Objects;
import java.util.UUID;

public class FileUtil {
    public static File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convertFile = new File(String.format("%s_%s", UUID.randomUUID(), file.getOriginalFilename()));
        FileOutputStream fos = new FileOutputStream(convertFile);
        fos.write(file.getBytes());
        fos.close();
        return convertFile;
    }
}
