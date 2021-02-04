package com.example.demo.rest;



import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.JsonData;


import org.json.JSONObject;  
import org.json.JSONArray;  

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@RestController
public class MyListApi {

//	@RequestMapping({ "/" })
//	public String firstPage() {
//		return "index.html";
//	}

	@RequestMapping({ "/hello" })
	public String hello() {
		return "hello";
	}

	
	@RequestMapping(value="/getdata",method = RequestMethod.GET,produces= MediaType.TEXT_HTML_VALUE )
	public String getData()  {
		
//		JSONArray array = new JSONArray(JsonData.val);  
		
		 return JsonData.val;
	}
}
