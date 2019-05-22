package com.projects.demo.modules.tinyurl.api;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@ResponseBody
@RequestMapping("/api/tinyurl")
public class TinyUrlController {

    @GetMapping("")
    public String home() {
        return "hello world";
    }
}
