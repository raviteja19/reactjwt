package com.example.demo.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.stereotype.Controller;

@Controller
public class IndexController {

	 @RequestMapping(value = {"/","/data"})
	    public String index() {
	        return "index.html";
	    }
}
