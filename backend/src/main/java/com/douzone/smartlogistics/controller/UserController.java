package com.douzone.smartlogistics.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.douzone.smartlogistics.dto.JsonResult;
import com.douzone.smartlogistics.security.AuthUser;
import com.douzone.smartlogistics.service.FileUploadService;
import com.douzone.smartlogistics.service.UserService;
import com.douzone.smartlogistics.vo.UserVo;


@RestController
@RequestMapping("/api/user")
public class UserController {
	
	@Autowired
	
	private UserService userService;
	@Autowired
	private FileUploadService FileUploadService;
	
	@GetMapping("")
	public ResponseEntity<JsonResult> index(Model model) {
		
		System.out.println(userService.getUsers());
		System.out.println();
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(userService.getUsers()));
	}
	
	//argument에서 읽어서 합친 후 파라미터를 @AuthUser UserVo 하나만 할 지
	@PostMapping
	public ResponseEntity<JsonResult> add(@RequestPart MultipartFile file, UserVo userVo, @AuthUser UserVo authUser) {
		System.out.println("file: "+ file);
		System.out.println("userVo "+ userVo);
		userVo.setInsert_id(authUser.getId());
		userVo.setInsert_ip(authUser.getInsert_ip());
		userVo.setProfile("");
		System.out.println("userVo : "+ userVo);
		userService.addUser(userVo);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(userVo));
	}
	
	@PostMapping("/login")
	public ResponseEntity<JsonResult> login(@AuthUser UserVo userVo) {
		//prehandler로 처리해서 받아온 유저정보
		System.out.println("controller => authuser "+userVo);
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(userVo));
	}
	
	@GetMapping("/logout")
	public ResponseEntity<JsonResult> logout() {//세션은 각 유저마다 생기는거여서 세션이면 유저데이터 안 받아도 됨. jwt할땐 바꿔야할부분
		
		return ResponseEntity.status(HttpStatus.OK).body(JsonResult.success(true));
	}
	
}