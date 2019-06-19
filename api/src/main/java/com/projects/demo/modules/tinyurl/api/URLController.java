package com.projects.demo.modules.tinyurl.api;

import com.projects.demo.modules.blog.dto.ResponseMessage;
import com.projects.demo.modules.blog.entity.Post;
import com.projects.demo.modules.blog.service.MapValidationErrorService;
import com.projects.demo.modules.tinyurl.entity.URL;
import com.projects.demo.modules.tinyurl.service.URLService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.validation.Valid;
import java.math.BigInteger;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.ByteBuffer;
import java.util.Base64;

@Controller
@ResponseBody
@RequestMapping("/api/tinyURL")
public class URLController {

    @Resource
    private URLService urlService;

    @Resource
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("")
    public ResponseEntity<?> createURL(@Valid @RequestBody URL url, BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        String shortenURL = urlService.saveOrUpdate(url);
        return new ResponseEntity<>(new ResponseMessage(shortenURL), HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getURL(@PathVariable("id") String encodedID) {
        URL url = urlService.findByEncodedID(encodedID);
        HttpHeaders httpHeaders = new HttpHeaders();
        try {
            httpHeaders.setLocation(new URI(url.getOriginalURL()));
        } catch (URISyntaxException e) {
            return new ResponseEntity<>(new ResponseMessage("Failed to redirect"), HttpStatus.CREATED);
        }
        return new ResponseEntity<>(httpHeaders, HttpStatus.SEE_OTHER);
    }
}
