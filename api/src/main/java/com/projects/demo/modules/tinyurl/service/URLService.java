package com.projects.demo.modules.tinyurl.service;

import com.projects.demo.modules.blog.exception.ResourceNotFoundException;
import com.projects.demo.modules.tinyurl.entity.URL;
import com.projects.demo.modules.tinyurl.repository.URLRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.math.BigInteger;
import java.util.Base64;
import java.util.Optional;

@Service
public class URLService {

    @Value("${server.url}")
    private String serverURL;

    @Resource
    private URLRepository urlRepository;

    public String saveOrUpdate(URL url) {
        Optional<URL> existedURL = urlRepository.findOneByOriginalURL(url.getOriginalURL());

        if (existedURL.isPresent()) {
            return this.getShortenURL(existedURL.get().getId());
        }

        URL newURL = urlRepository.save(url);
        return this.getShortenURL(newURL.getId());
    }

    public URL findById(Long id) {
        return urlRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException(
                String.format("Post ID %s does not exist", id))
        );
    }

    public URL findByEncodedID(String encodedID) {
        BigInteger id = new BigInteger(Base64.getDecoder().decode(encodedID));
        return findById(id.longValue());
    }

    private String getShortenURL(Long id) {
        return String.format(
                "%s/%s",
                this.serverURL,
                Base64.getEncoder().encodeToString(BigInteger.valueOf(id).toByteArray()));
    }
}
